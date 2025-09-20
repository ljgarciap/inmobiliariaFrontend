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
