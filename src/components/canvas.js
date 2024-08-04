import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import "../App.css";

const DigitalSignature = () => {
  const [penColor, setPenColor] = useState('black');
  const signatureRef = useRef(null);
  const [result, setResult] = useState(null);

  const handlerClear = () => {
    signatureRef.current.clear();
    setResult(null);
  };

  const handlerSave = () => {
    const res = signatureRef.current.getTrimmedCanvas().toDataURL('image/jpeg');
    setResult(res);
  };

  return (
    <div className="digital-signature-container">
      <h2>Digital Signature</h2>
      <div className="controls">
        <label htmlFor="penColor">Pen Color:</label>
        <select id="penColor" value={penColor} onChange={(e) => setPenColor(e.target.value)}>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="blue">Blue</option>
        </select>
        <div className="pen-color-indicator" style={{ backgroundColor: penColor }}></div>
      </div>

      <div className="signature-pad">
        <SignatureCanvas
          penColor={penColor}
          ref={signatureRef}
          canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
          backgroundColor="rgba(255,255,255,1)"
        />
      </div>

      <div className="buttons">
        <button onClick={handlerClear} className="btn-clear">Clear</button>
        <button onClick={handlerSave} className="btn-save">Save</button>
      </div>

      {result && (
        <div className="result">
          <h3>Signature Result</h3>
          <img src={result} alt="Signature" className="signature-image" />
          <a href={result} download="signature.jpg" className="btn-download">Download</a>
        </div>
      )}
    </div>
  );
};

export default DigitalSignature;
