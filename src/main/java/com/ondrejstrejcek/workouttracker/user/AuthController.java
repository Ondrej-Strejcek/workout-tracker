package com.ondrejstrejcek.workouttracker.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping(path="/api/auth/")
@AllArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;


    //@Route    POST /api/auth/register
    //@Desc     Creates a new Customer
    //@Auth     Does not require to be authenticated
    @PostMapping(path = "/register")
    public ResponseEntity<?> createCustomer(HttpServletRequest request, HttpServletResponse response){
        Auth user = new Auth();
        log.info(request.getParameter("password"));
        log.info(request.getParameter("password2"));
        String pw1 = request.getParameter("password");
        String pw2 = request.getParameter("password2");
        if(!pw1.equals(pw2)){
            return ResponseEntity.badRequest().body("Passwords does not match");
        }
        user.setUsername(request.getParameter("username"));
        user.setPassword(request.getParameter("password"));
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/auth/register").toUriString());
        return ResponseEntity.created(uri).body(authService.saveUser(user));
    }


    //@Route    POST /api/auth/register
    //@Desc     Check if token is valid
    //@Auth     Does not require to be authenticated
    @PostMapping(path = "/check-token")
    public void checkToken(HttpServletRequest request, HttpServletResponse response){
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        log.info(authorizationHeader);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            try {
                String token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("W7tymQ0V4zFc73reMDiqRug".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(token);
                String email = decodedJWT.getSubject();
                String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                Auth user = authService.checkUser(email);
                CheckResponse res = new CheckResponse(true, user.getSuperUser(), user.getUsername());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), res);
            }catch (Exception e){
                log.error("Error logging in: {}", e.getMessage());
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        }else {
            throw new RuntimeException("Token missing");
        }
    }




}
