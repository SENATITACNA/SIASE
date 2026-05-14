import React from 'react';

interface Props {
  etiqueta: string;
  valor: number;
  icono: React.ReactNode;
  variante?: 'default' | 'exito';
}

const TarjetaStat: React.FC<Props> = ({ etiqueta, valor, icono, variante = 'default' }) => {
  const esExito = variante === 'exito';

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#ffffff',
      border: '1px solid #e8eaed',
      borderRadius: '14px',
      padding: '20px 24px',
      flex: 1,
      minWidth: '180px',
      maxWidth: '260px',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#6b7280' }}>{etiqueta}</span>
        <span style={{ fontSize: '28px', fontWeight: 700, color: esExito ? '#16a34a' : '#111827', lineHeight: 1 }}>
          {valor}
        </span>
      </div>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: esExito ? '#dcfce7' : '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {icono}
      </div>
    </div>
  );
};

export default TarjetaStat;