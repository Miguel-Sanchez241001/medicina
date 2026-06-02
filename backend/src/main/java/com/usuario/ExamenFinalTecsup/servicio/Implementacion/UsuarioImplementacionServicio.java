package com.usuario.ExamenFinalTecsup.servicio.Implementacion;

import com.usuario.ExamenFinalTecsup.entidad.Usuario;
import com.usuario.ExamenFinalTecsup.persistencia.IUsuarioDAO;
import com.usuario.ExamenFinalTecsup.servicio.IUsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioImplementacionServicio implements IUsuarioServicio {

    @Autowired
    private IUsuarioDAO persistencia;

    @Override
    public List<Usuario> ObtenerListado() {
        return persistencia.ObtenerListado();
    }

    @Override
    public Optional<Usuario> ObtenerUsuarioPorId(long id) {
        if (id <= 0) {
            throw new IllegalArgumentException("El Id debe ser mayor de 0");
        }
        return persistencia.ObtenerUsuarioPorId(id);
    }

    @Override
    public void GuardarUsuario(Usuario usuario) {
        if (usuario.getNombre() == null || usuario.getNombre().isBlank()) {
            throw new IllegalArgumentException("El nombre del usuario es obligatorio.");
        }
        if (usuario.getApellido() == null || usuario.getApellido().isBlank()) {
            throw new IllegalArgumentException("El apellido del usuario es obligatorio.");
        }
        if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
            throw new IllegalArgumentException("El email del usuario es obligatorio.");
        }
        if (usuario.getContrasena() == null || usuario.getContrasena().isBlank()) {
            throw new IllegalArgumentException("La contrasena del usuario es obligatoria.");
        }
        persistencia.GuardarUsuario(usuario);
    }

    @Override
    public void ActualizarUsuario(long id, Usuario usuario) {
        if (id <= 0) {
            throw new IllegalArgumentException("El Id debe ser mayor de 0");
        }
        if (usuario.getNombre() == null || usuario.getNombre().isBlank()) {
            throw new IllegalArgumentException("El nombre del usuario es obligatorio.");
        }
        if (usuario.getApellido() == null || usuario.getApellido().isBlank()) {
            throw new IllegalArgumentException("El apellido del usuario es obligatorio.");
        }
        if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
            throw new IllegalArgumentException("El email del usuario es obligatorio.");
        }
        if (usuario.getContrasena() == null || usuario.getContrasena().isBlank()) {
            throw new IllegalArgumentException("La contrasena del usuario es obligatoria.");
        }
        persistencia.ActualizarUsuario(id, usuario);
    }

    @Override
    public void EliminarUsuarioPorId(long id) {
        if (id <= 0) {
            throw new IllegalArgumentException("El Id debe ser mayor de 0");
        }
        persistencia.EliminarUsuarioPorId(id);
    }
}
