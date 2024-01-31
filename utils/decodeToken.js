export default function decodeToken(token) {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    const payloadObject = JSON.parse(payload);
    const lawyerID = payloadObject.user_id;
    return lawyerID
}
  