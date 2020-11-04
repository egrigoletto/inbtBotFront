axios.defaults.baseURL = 'http://localhost';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Headers'] = '*';
var sessionResponse
var conversationResponse
var messageResponse

function getConversationSession() {
  axios.get('http://localhost:9075/session')
  .then((session) => {
    sessionResponse = session
  })
  .catch(err => console.error(err))
}

function intializeConversation(session) {
  let data = session
  axios.post('http://localhost:9075/conversation', data)
  .then((conversation) => {
    if (session.accessToken !== conversation[1].accessToken)
    sessionResponse = conversation[1]
    conversationResponse = conversation[0]
  })
  .catch(err => console.error(err))
}

function sendMessage(message) {
  data = {
    conversationData: conversationResponse,
    message: message
  }
  axios.post('http://localhost:9075/message', data)
  .then((message) => {
    messageResponse = message
  })
  .catch(err => console.error(err))
}
