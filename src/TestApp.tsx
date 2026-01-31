function TestApp() {
  return (
    <div style={{ 
      padding: '50px', 
      fontSize: '24px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>✅ React is Working!</h1>
      <p>If you see this, React is rendering correctly.</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
      <button 
        onClick={() => alert('Button works!')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          background: 'white',
          color: '#667eea',
          border: 'none',
          borderRadius: '8px',
          marginTop: '20px'
        }}
      >
        Click Me
      </button>
    </div>
  );
}

export default TestApp;
