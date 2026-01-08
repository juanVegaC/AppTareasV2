using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Asignacion;
using API.DTOs.Asignaciones;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IAsignacionRepository
    {
        void AsignaTarea(CreateAsignacionDto asignacion);

        

         
    }
}