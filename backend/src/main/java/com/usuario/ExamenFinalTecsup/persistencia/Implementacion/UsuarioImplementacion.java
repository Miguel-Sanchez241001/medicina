package com.usuario.ExamenFinalTecsup.persistencia.Implementacion;

import com.usuario.ExamenFinalTecsup.entidad.Usuario;
import com.usuario.ExamenFinalTecsup.persistencia.IUsuarioDAO;
import com.usuario.ExamenFinalTecsup.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Profile("bd")
@Component
public class UsuarioImplementacion implements IUsuarioDAO {

    @Autowired
    private UsuarioRepositorio repositorio;

    @Override
    public List<Usuario> ObtenerListado() {
        return (List<Usuario>) repositorio.findAll();
    }

    @Override
    public Optional<Usuario> ObtenerUsuarioPorId(long id) {
        return repositorio.findById(id);
    }

    @Override
    public void GuardarUsuario(Usuario usuario) {
        repositorio.save(usuario);
    }

    @Override
    public void ActualizarUsuario(long id, Usuario usuario) {
        Usuario existente = repositorio.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró usuario con id: " + id));
        existente.setNombre(usuario.getNombre());
        existente.setApellido(usuario.getApellido());
        existente.setEmail(usuario.getEmail());
        existente.setContrasena(usuario.getContrasena());
        existente.setTelefono(usuario.getTelefono());
        existente.setActivo(usuario.isActivo());
        repositorio.save(existente);
    }

    @Override
    public void EliminarUsuarioPorId(long id) {
        repositorio.deleteById(id);
    }
}
