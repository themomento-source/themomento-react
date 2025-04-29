export default function ImageProtector({ children }) {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
  
    return (
      <div onContextMenu={handleContextMenu} className="relative">
        {children}
        <div className="absolute inset-0 pointer-events-none" />
      </div>
    );
  }