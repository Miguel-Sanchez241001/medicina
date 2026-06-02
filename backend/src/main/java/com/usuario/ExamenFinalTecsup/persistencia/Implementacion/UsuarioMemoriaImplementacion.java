package com.usuario.ExamenFinalTecsup.persistencia.Implementacion;

import com.usuario.ExamenFinalTecsup.entidad.Usuario;
import com.usuario.ExamenFinalTecsup.persistencia.IUsuarioDAO;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Profile("!bd")
@Component
public class UsuarioMemoriaImplementacion implements IUsuarioDAO {

    private final Map<Long, Usuario> almacen = new ConcurrentHashMap<>();
    private final AtomicLong contador = new AtomicLong(1);

    @Override
    public List<Usuario> ObtenerListado() {
        return new ArrayList<>(almacen.values());
    }

    @Override
    public Optional<Usuario> ObtenerUsuarioPorId(long id) {
        return Optional.ofNullable(almacen.get(id));
    }

    @Override
    public void GuardarUsuario(Usuario usuario) {
        long id = contador.getAndIncrement();
        usuario.setId(id);
        almacen.put(id, usuario);
    }

    @Override
    public void ActualizarUsuario(long id, Usuario usuario) {
        if (!almacen.containsKey(id)) {
            throw new IllegalArgumentException("No se encontró usuario con id: " + id);
        }
        usuario.setId(id);
        almacen.put(id, usuario);
    }

    @Override
    public void EliminarUsuarioPorId(long id) {
        if (!almacen.containsKey(id)) {
            throw new IllegalArgumentException("No se encontró usuario con id: " + id);
        }
        almacen.remove(id);
    }
}
