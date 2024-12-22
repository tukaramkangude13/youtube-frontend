const ShareModal = ({ full, setShare }) => {
    const shareLinks = [
      { name: 'WhatsApp', url: `https://wa.me/?text=${encodeURIComponent(full?.items[0]?.snippet?.customUrl)}` },
      { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(full?.items[0]?.snippet?.customUrl)}` },
      // Add other platforms here...
    ];
  
    return (
      <div className="absolute bg-gray-900 text-white z-20">
        <button onClick={() => setShare(false)}>Close</button>
        {shareLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.name}
          </a>
        ))}
      </div>
    );
  };
  
  export default ShareModal;
  