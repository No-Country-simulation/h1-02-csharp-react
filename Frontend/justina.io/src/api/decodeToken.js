function decodeBase64Url(base64Url) {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

export function decodePayload(tokenJWT) {
  //Se recupera el payload en base64
  const payloadBase64 = tokenJWT.split(".")[1];

  if (!payloadBase64) {
    console.error("Token inválido");
    return null;
  }

  try {
    //Se decodifica y se recupera el objeto
    const decodedPayload = JSON.parse(decodeBase64Url(payloadBase64));

    return decodedPayload;
  } catch (error) {
    console.error("Error al decodificar el payload:", error);
    return null;
  }
}

export function getValidUser(payload){
    return {
        id: payload.uid,
        email: payload.email,
        roles: payload.roles,
        fullname: payload.name 
    }
}