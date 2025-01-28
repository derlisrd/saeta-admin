

export interface availableColorsType {
    name: string;
    color: string;
    secondary : string;
}

export const availableColors : Array<availableColorsType> = [
    { name: "violet", color: "#734ad5", secondary : "#d500f9" },
    { name: "green", color: "#00AB55", secondary : "#3366FF" },
    { name: "bluelight", color: "#2187ab", secondary : "#f6ab4d" },
    { name: "bluesky", color: "#2189e4", secondary : "#f6ab4d" },
    { name: "orange", color: "#d76a16", secondary : "#8298cf" },
    { name: "red", color: "#FF4838", secondary : "#FF4838" },
    { name: "new", color: "#2065D1", secondary : "#3366FF" },
    {name : "black", color: "#000000", secondary : "#444"},
  ];
  
  export const colorsMode = {
    light: {
      textPrimary:'#2c2c2c',
      textSecondary:'#6C737F',
      divider:'#F2F4F7',
      bgpaper:"#fff",
      bgdefault:"#f1f1f1",
      transparent:'#ffffff3d'
    },
    dark:{
      textPrimary:'#EDF2F7',
      textSecondary:'#A0AEC0',
      divider:'#2D3748',
      bgpaper: "#1f262e",
      bgdefault: "#161c24",
      transparent:'#0d11176e'
    },
  }
  
  
  export const colors  = {
    
    new: {
      primary:{
        lighter: '#D1E9FC',
        light: '#76B0F1',
        main: '#2065D1',
        dark: '#103996',
        darker: '#061B64',
        contrastText: '#fff',
      },
      secondary:{
        lighter: '#D6E4FF',
        light: '#84A9FF',
        main: '#3366FF',
        dark: '#1939B7',
        darker: '#091A7A',
        contrastText: '#fff',
      }
    },
  
    violet: {
      primary: {
        light: "#512da81f",
        main: "#734ad5",
        dark: "#381f75",
        contrastText: "#fff",
      },
      secondary: {
        light: "#dd33fa",
        main: "#d500f9",
        dark: "#9500ae",
        contrastText: "#000",
      },
    },
    green: {
      primary: {
        lighter:'#C8FACD',
        light: "#5BE584",
        main: "#00AB55",
        dark: "#007B55",
        darker:'#005249',
        contrastText: "#fff",
      },
      secondary: {
        lighter:'#D6E4FF',
        light: "#84A9FF",
        main: "#3366FF",
        dark: "#1939B7",
        darker:'#091A7A',
        contrastText: "#fff",
      },
    },
    bluelight: {
      primary: {
        light: "#66b6d21f",
        main: "#2187ab",
        dark: "#1a6985",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffeb8c",
        main: "#f6ab4d",
        dark: "#d76a16",
        contrastText: "#000",
      },
    },
    bluesky: {
      primary: {
        light: "#2189e41f",
        main: "#2189e4",
        dark: "#0d52a4",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffeb8c",
        main: "#f6ab4d",
        dark: "#d76a16",
        contrastText: "#000",
      },
    },
    orange: {
      primary: {
        light: "#d76a161f",
        main: "#d76a16",
        dark: "#923108",
        contrastText: "#fff",
      },
      secondary: {
        light: "#d3deff",
        main: "#8298cf",
        dark: "#647baf",
        contrastText: "#000",
      },
    },
    red: {
      primary: {
        light: "#FF48381f",
        main: "#FF4838",
        dark: "#931127",
        contrastText: "#fff",
      },
      secondary: {
        light: "#FFC9AF",
        main: "#FF4838",
        dark: "#931127",
        contrastText: "#000",
      },
    },
    black: {
      primary: {
        light: "#0000001f",
        main: "#000000",
        dark: "#000000",
        contrastText: "#fff",
      },
      secondary: {
        light: "#444",
        main: "#444",
        dark: "#444",
        contrastText: "#000",
      },
    }
  };