## Metaverse - webRTC 

---

> webRTC 란 

- Web Real Time Communication 의 약자로 실시간 영상 스트리밍, 화상 채팅등의 기능을 지원하는 API.
- 웹 에서 서버를 최대한 거치지 않고, 각 peer 간의 UDP 프로토콜을 사용하여 위의 기능들을 제공한다.  

<br>

> WebRTC의 특징 
- 구글에서 오픈소스로 푼 라이브러리이기 때문에, 비용이 들지 않고 별도의 미디어 서버를 구축하는데 큰 공수가 들지 않음. 
- 웹 브라우저 위에서 뿐만 아니라, AOS, IOS등과 같은 Client 위에서도 동작 가능.
- 음성, 영상, 채팅, 실시간 스트리밍등 다양한 기능 제공. 
- 1:1, 1:N, N:M 와 같이 본인이 원하는 방식 + 서비스 성격에 맞게 커스텀하게 구현 가능. 

<br>

> DOCS

- signaling server

- stun server

- turn server

- media server

- ice

- ice candidating

- sdp(session description protocl) 
    - webRTC에서 사용되는 프로토콜로, 스트리밍 미디어 초디화 인수를 규격화 하기 위한 표준 포맷 (RFC 4665에 기재)
    - 제안과 수락 모델로 구성되어짐. 
    - peer - peer 간 종단간 연결을 위해서 각 peer가 가지는 




<br>

> 고려사항 
- 중간에 미디어 서버를 둘지?