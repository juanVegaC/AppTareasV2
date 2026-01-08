using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public ITareaRepository TareaRepository => new TareaRepository(_context, _mapper);
        public IPuestoRepository PuestoRepository => new PuestoRepository(_context, _mapper);
        public IEmpleadoRepository EmpleadoRepository => new EmpleadoRepository(_context, _mapper);
        public ITextoRepository TextoRepository => new TextoRepository(_context, _mapper);
        public IEstatusRepository EstatusRepository => new EstatusRepository(_context, _mapper);
        public IEstadoRepository EstadoRepository => new EstadoRepository(_context);
        public IActividadRepository ActividadRepository => new ActividadRepository(_context, _mapper);
        public IAsignacionesRepository AsignacionesRepository => new AsignacionesRepository(_context, _mapper);
        public ITableroRepository TableroRepository => new TableroRepository(_context, _mapper);
        public IPuestoTabRepository PuestoTabRepository => new PuestoTabRepository(_context, _mapper);
        public ITabEstadoRepository TabEstadoRepository => new TabEstadoRepository(_context);


        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }        
    }
}