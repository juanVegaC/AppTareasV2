using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        ITareaRepository TareaRepository { get; }
        IPuestoRepository PuestoRepository { get; }
        IEmpleadoRepository EmpleadoRepository { get; }
        ITextoRepository TextoRepository { get; }
        IEstatusRepository EstatusRepository { get; }
        IEstadoRepository EstadoRepository { get; }
        IActividadRepository ActividadRepository { get; }
        IAsignacionesRepository AsignacionesRepository { get; }
        ITableroRepository TableroRepository { get; }
        IPuestoTabRepository PuestoTabRepository { get; }
        ITabEstadoRepository TabEstadoRepository { get; }
        Task<bool> Complete();
        bool HasChanges();        
    }
}