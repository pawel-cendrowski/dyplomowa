import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
      height: 'calc(100vh - 200px)', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000',
      background: '#fff'
    }}>
      <div>
        <h1 style={{
          display: 'inline-block',
          margin: 0,
          marginRight: '20px',
          padding: '10px 23px 10px 0',
          fontSize: '24px',
          fontWeight: 500,
          verticalAlign: 'top',
          borderRight: '1px solid rgba(0, 0, 0, .3)'
        }}>
          404
        </h1>
        <div style={{
          display: 'inline-block',
          textAlign: 'left',
          lineHeight: '49px',
          height: '49px',
          verticalAlign: 'middle'
        }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'normal',
            lineHeight: 'inherit',
            margin: 0,
            padding: 0
          }}>
            This page could not be found.
          </h2>
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Link href="/" style={{ fontSize: '14px', textDecoration: 'underline', color: '#666' }}>
          Back Home
        </Link>
      </div>
    </div>
  );
}