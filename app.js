document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Leer campos del formulario
  const paciente      = document.getElementById('paciente').value;
  const consulta      = document.getElementById('consulta').value;
  const medico        = document.getElementById('medico').value;
  const cedula        = document.getElementById('cedula').value;
  const especialidad  = document.getElementById('especialidad').value;
  const dx            = document.getElementById('dx').value;
  const proc          = document.getElementById('proc').value;
  const just          = document.getElementById('just').value;
  const fechaCita     = document.getElementById('fechaCita').value;
  const hora          = document.getElementById('hora').value;

  const serviceRequestData = {
    paciente,
    consulta,
    medico,
    cedula,
    especialidad,
    diagnostico: dx,
    procedimiento: proc,
    justificacion: just,
    fechaCita,
    hora
  };

  console.log('Enviando:', serviceRequestData);

  fetch('https://hl7-fhir-ehr-leonardo.onrender.com/service-request/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceRequestData)
  })
  .then(async response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }
    // sólo parsear JSON si el servidor lo devuelve
    const ct = response.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      const data = await response.json();
      console.log('Success:', data);
      alert('Service Request creado exitosamente! ID: ' + data._id);
    } else {
      alert('Service Request enviado, pero sin respuesta en JSON.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un error en la solicitud: ' + error.message);
  });
});
