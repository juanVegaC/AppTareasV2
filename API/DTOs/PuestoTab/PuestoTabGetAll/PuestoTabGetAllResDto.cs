namespace API.DTOs.TabEstado.PuestoTabGetAll
{
    public class PuestoTabGetAllResDto
    {
        public int Id { get; set; }
        public int puestoId { get; set; }
        public string puestoTitulo { get; set; }
        public int tableroId { get; set; }
        public string tableroNombre { get; set; }
        public bool principal { get; set; }
        public bool borrado { get; set; }
    }
}