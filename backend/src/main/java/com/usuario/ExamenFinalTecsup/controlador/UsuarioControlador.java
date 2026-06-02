package com.usuario.ExamenFinalTecsup.controlador;

import com.usuario.ExamenFinalTecsup.entidad.Usuario;
import com.usuario.ExamenFinalTecsup.servicio.IUsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioControlador {

    @Autowired
    private IUsuarioServicio servicio;

    @GetMapping
    public ResponseEntity<List<Usuario>> ObtenerListado() {
        List<Usuario> lista = servicio.ObtenerListado();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> ObtenerUsuarioPorId(@PathVariable long id) {
        try {
            Optional<Usuario> usuario = servicio.ObtenerUsuarioPorId(id);
            if (usuario.isPresent()) {
                return ResponseEntity.ok(usuario.get());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontro un usuario con el id: " + id);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> GuardarUsuario(@RequestBody Usuario usuario) {
        try {
            servicio.GuardarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Usuario registrado correctamente.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> ActualizarUsuario(@PathVariable long id, @RequestBody Usuario usuario) {
        try {
            servicio.ActualizarUsuario(id, usuario);
            return ResponseEntity.ok("Usuario actualizado correctamente.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> EliminarUsuarioPorId(@PathVariable long id) {
        try {
            servicio.EliminarUsuarioPorId(id);
            return ResponseEntity.ok("Usuario eliminado correctamente.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
