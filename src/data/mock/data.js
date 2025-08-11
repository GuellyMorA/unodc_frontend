export const mockData = {
  regions: [
    {
      id: 1,
      name: 'La Paz',
      latitude: -16.5,
      longitude: -68.1
    },
    {
      id: 2,
      name: 'Cochabamba',
      latitude: -17.4,
      longitude: -66.2
    },
    {
      id: 3,
      name: 'Santa Cruz',
      latitude: -17.8,
      longitude: -63.2
    },
    {
      id: 4,
      name: 'Sucre',
      latitude: -19.0,
      longitude: -65.3
    },
    {
      id: 5,
      name: 'Tarija',
      latitude: -21.5,
      longitude: -64.7
    },
    {
      id: 6,
      name: 'Oruro',
      latitude: -17.5,
      longitude: -67.1
    },
    {
      id: 7,
      name: 'Potosí',
      latitude: -19.6,
      longitude: -65.8
    },
    {
      id: 8,
      name: 'Chuquisaca',
      latitude: -19.1,
      longitude: -64.3
    },
    {
      id: 9,
      name: 'Beni',
      latitude: -14.3,
      longitude: -66.9
    }
  ],
  denuncias: [
    {
      id: 1,
      name: 'Accidente de tránsito'
    },
    {
      id: 2,
      name: 'Conducción temeraria'
    },
    {
      id: 3,
      name: 'Exceso de velocidad'
    },
    {
      id: 4,
      name: 'Falta de respeto a la señalización'
    },
    {
      id: 5,
      name: 'Otro'
    }
  ],
  denunciasPorDia: [
    { dia: 'lunes', total: 0 },
    { dia: 'Martes', total: 0 },
    { dia: 'Miercoles', total: 0 },
    { dia: 'Jueves', total: 0 },
    { dia: 'Viernes', total: 0 },
  ],

  denunciasPorMes: [
    { mes: 'Enero', total: 0 },
    { mes: 'Febrero', total: 0 },
    { mes: 'Marzo', total: 0 },
    { mes: 'Abril', total: 0},
    { mes: 'Mayo', total: 0 },
    { mes: 'Junio', total: 0 },
    { mes: 'Julio', total: 0 },
    { mes: 'Agosto', total: 0 },
    { mes: 'Septiembre', total: 0 },
    { mes: 'Octubre', total: 0 },
    { mes: 'Noviembre', total: 0 },
    { mes: 'Diciembre', total: 0 }
  ],
  denunciasRechazadas: [
    { mes: 'Enero', total: 0 },
    { mes: 'Febrero', total: 0 },
    { mes: 'Marzo', total: 0 },
    { mes: 'Abril', total: 0},
    { mes: 'Mayo', total: 0 },
    { mes: 'Junio', total: 0 },
    { mes: 'Julio', total: 0 },
    { mes: 'Agosto', total: 0 },
    { mes: 'Septiembre', total: 0 },
    { mes: 'Octubre', total: 0 },
    { mes: 'Noviembre', total: 0 },
    { mes: 'Diciembre', total: 0 }
  ],
  
  denunciasPorDepto: [
    { region: 'LP', total: 0 },
    { region: 'SC', total: 0 },
    { region: 'CH', total: 0 },
    { region: 'CBBA', total: 0 },
    { region: 'OR', total: 0 },
    { region: 'TAR', total: 0 },
    { region: 'BE', total: 0 },
    { region: 'PAN', total: 0 },
  ],

  denunciasPorTipo: [
    { tipo: 'Den.nuevas asignadas', total: 0 },
    { tipo: 'Den.con retraso en plazos', total: 0 },
    { tipo: 'Denu.con seguimiento', total: 0 },
    { tipo: 'Denuncias rechazadas', total: 0 },
    { tipo: 'Den.con informe final', total: 0 }
  ],

};