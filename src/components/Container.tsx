interface IProps {
  children: React.ReactNode;
}

function Container({ children }: IProps) {
  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '1440px',
        height: '100vh',
        background: '#ccc',
        border: '1px solid grey',
      }}>
      <div style={{ padding: '100px' }}>{children}</div>
    </div>
  );
}

export default Container;
