import React, { useState } from 'react';

const App = () => {
  const [image, setImage] = useState<string | null>(null);
  const [restrictions, setRestrictions] = useState<string>('');
  const [results, setResults] = useState<any>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImage(event.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (image) {
      const response = await fetch('http://localhost:8000/runcheck/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: image,
          restrictions: restrictions.split(',').map((r) => r.trim()),
        }),
      });
      const data = await response.json();
      setResults(data);
    }
  };

  return (
    <div>
      <h1>Recipe Checker</h1>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <label>Restrictions (comma-separated):</label>
        <input
          type="text"
          value={restrictions}
          onChange={(e) => setRestrictions(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Check Recipe</button>
      {results && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
