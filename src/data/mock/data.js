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
    { dia: 'lunes', total: 5 },
    { dia: 'Martes', total: 6 },
    { dia: 'Miercoels', total: 7 },
    { dia: 'Jueves', total: 8 },
    { dia: 'Viernes', total: 5 },
  ],

  denunciasPorMes: [

    { mes: 'Julio', total: 45 },
    { mes: 'Agosto', total: 60 },
    { mes: 'Septiembre', total: 75 },
    { mes: 'Octubre', total: 80 },
    { mes: 'Noviembre', total: 50 },
    { mes: 'Diciembre', total: 40 }
  ],
  denunciasRechazadas: [
    { mes: 'Enero', total: 4 },
    { mes: 'Febrero', total: 0 },
    { mes: 'Marzo', total: 5 },
    { mes: 'Abril', total: 8},
    { mes: 'Mayo', total: 5 },
    { mes: 'Junio', total: 9 },
    { mes: 'Julio', total: 45 },
    { mes: 'Agosto', total: 60 },
    { mes: 'Septiembre', total: 75 },
    { mes: 'Octubre', total: 80 },
    { mes: 'Noviembre', total: 50 },
    { mes: 'Diciembre', total: 40 }
  ],
  
  denunciasPorDepto: [
    { region: 'LP', total: 100 },
    { region: 'SC', total: 80 },
    { region: 'CH', total: 45 },
    { region: 'CBBA', total: 60 },
    { region: 'OR', total: 100 },
    { region: 'TAR', total: 80 },
    { region: 'BE', total: 45 },
    { region: 'PAN', total: 60 },
  ],

  denunciasPorTipo: [
    { tipo: 'Den.nuevas asignadas', total: 120 },
    { tipo: 'Den.con retraso en plazos', total: 85 },
    { tipo: 'Denu.con seguimiento', total: 56 },
    { tipo: 'Denuncias rechazadas', total: 33 },
    { tipo: 'Den.con informe final', total: 75 }
  ],

};