package momsDeveloper.itmoweb.lab3.service;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Service
public class JwtService {

    private final String secret;
    private final Duration lifeTime;

    public JwtService(@Value("${jwt.secret}") String secret, @Value("${jwt.lifetime}") Duration duration) {
        this.secret = secret;
        this.lifeTime = duration;
    }

    public String generateToken(UserDetails userDetails) {
        List<String> roles = userDetails.getAuthorities().stream().map(role -> role.getAuthority())
                .collect(Collectors.toList());

        final Date now = new Date(System.currentTimeMillis());
        final Date expiryDate = new Date(now.getTime() + lifeTime.toMillis());

        return JWT.create().withSubject(userDetails.getUsername()).withIssuedAt(now).withExpiresAt(expiryDate).withClaim("roles", roles)
                .sign(Algorithm.HMAC256(secret));
    }

    public String getSubject(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret)).build();
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getSubject();
    }

     public List<String> getAuthorities(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret)).build();
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getClaim("roles").asList(String.class);
     }

    
}
