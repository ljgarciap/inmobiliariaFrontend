export interface Property {
  id: number;
  detalle: string;
  descripcion: string;
  ciudad: string;
  habitaciones: number;
  banios: number;
  tipo_transaccion: 'arriendo' | 'venta';
  precio: number;
  precio_arriendo: number | null;
  precio_venta: number | null;
  caracteristicas: string[];
  imagenes: PropertyImage[];
  imagen_principal: string | null;
  latitud: number | string;
  longitud: number | string;
  direccion_completa: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: number;
  url: string;
  principal: boolean;
  ruta_imagen: string;
}

export interface PropertyFilters {
  ciudad_id?: number;
  tipo_transaccion?: string;
  precio_minimo?: number;
  precio_maximo?: number;
  habitaciones?: number[];
  caracteristicas?: number[];
  page?: number;
}

export interface PropertyApiResponse {
  data: Property[];
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    links: any[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
