# PACEMAKER 프로젝트

2020.12.11 ~ 2020.12.14

## PACEMAKER란?

![서비스개요](https://user-images.githubusercontent.com/60081201/102709890-de5b2980-42f1-11eb-9666-d15455129aca.JPG)

**목표를 달성하도록 관리**해주는 핀테크 기술을 이용한 습관 형성 웹 서비스입니다.

### 서비스명의 의미

사용자가 설정한 목표를 이루기 위해 페이스를 관리해주는 웹 사이트이기에 PACEMAKER라는 서비스명을 지었습니다.

![로고](https://user-images.githubusercontent.com/60081201/102709615-90ddbd00-42ef-11eb-9bde-feb2a29891d4.JPG)



### 기획 배경

- 현재 언택트 시대로 인한 합리적인 소비가 증가하고 있습니다.
- 작심삼일의 마음가짐으로 목표를 세우고 달성하는 데 어려움을 겪은 사람들에 주목하였습니다. 

→ 아래의 동기부여의 중요성을 보여주는 칼럼을 통해 사용자의 합리적인 소비와 목표를 달성하기 위한 해결방안을 제시하는 웹 프로젝트를 기획하게 되었습니다.

<img src="https://user-images.githubusercontent.com/60081201/102709690-f8940800-42ef-11eb-8e7e-9355e749d147.JPG" alt="동기부여" style="zoom: 50%;" />



## :key: 프로젝트 사용법

로컬 웹 서버 실행 방법은 다음과 같습니다.

### Frontend

```bash
$ cd front/
$ yarn install
# 서버를 실행합니다.
$ yarn serve
```

### Backend

```bash
$ mvn package
$ java -jar backend/restapi/target/restapi-0.0.1-SNAPSHOT.jar
```



## 기술 스택

<img src="https://img.shields.io/badge/platform-Web-yellow" alt="기술스택" style="zoom:120%;" /><img src="https://img.shields.io/badge/Frontend-Vue.js, css/html/JavaScript, vuetify-green" alt="기술스택" style="zoom:120%;" /><img src="https://img.shields.io/badge/database-MySQL-yellowgreen" alt="기술스택" style="zoom:120%;" /><img src="https://img.shields.io/badge/backend-Springboot, swagger-ff69b4" alt="기술스택" style="zoom:120%;" /><img src="https://img.shields.io/badge/server-AWS-9cf" alt="기술스택" style="zoom:120%;" /><img src="https://img.shields.io/badge/language-Java, JavaScript, Python-important" alt="기술스택" style="zoom:120%;" /> 



## ERD

![erd](https://user-images.githubusercontent.com/60081201/102709850-6e4ca380-42f1-11eb-9ccd-b303cde23a93.JPG)



## REST API

| URL                             | 메소드 | 리퀘스트바디                                                 | 비고                     |
| ------------------------------- | ------ | ------------------------------------------------------------ | ------------------------ |
| /api/users                      | POST   | {     "userid":"another request",     "userpw":"request",     "userbirth":"2020-11-04 17:25:25",     "usergender":"26"     } | 회원가입                 |
| /api/sprint/{userId}            | GET    |                                                              | 스프린트 리스트 가져오기 |
| /api/sprint/{userId}            | POST   |                                                              | 스프린트 생성하기        |
| /api/marathon/{userid}          | GET    | {           "maraton_id":2           "purpose":"취미생활"           "color":"yellow"           "startDate":"2020-01-01"     } | 마라톤 목록 불러오기     |
| /api/marathonTask/{{maraton_id} | GET    |                                                              | 마라톤의 할일 불러오기   |
| /api/marathon/{userid}          | POST   |                                                              | 마라톤 생성하기          |



## 핵심 기능

![기능 설명](https://user-images.githubusercontent.com/60081201/102709854-845a6400-42f1-11eb-85b9-7f9f31cb6590.JPG)



## 개발한 주요 화면 설명

### `마라톤` 화면 

![마라톤 화면](https://user-images.githubusercontent.com/60081201/102710081-334b6f80-42f3-11eb-8e20-96c2b912fa23.JPG)

- 우측 상단의 ①번 위치에 ‘새 마라톤 만들기’버튼을 통해 마라톤을 생성할 수 있습니다.
- 중앙에 ②번은 전반적인 마라톤 현황을 볼 수 있습니다.
- ③번 목표 금액 수정이 가능하고 목표 금액까지의 진행률을 파악할 수 있습니다.
- ④번은 사용자가 설정한 마라톤들이 카테고리 별로 색을 통해 분류되어 있습니다.
- 이때 체크 표시를 통해 등록한 마라톤 이행 여부를 알 수 있습니다. 
- 체크 표시를 클릭할 경우 해당 리워드를 획득할 수 있습니다. 



### `스프린트` 화면 

![스프린트 화면](https://user-images.githubusercontent.com/60081201/102710082-33e40600-42f3-11eb-9710-678f3f24946c.JPG)

- ①번 위치에 ‘새 스프린트 만들기’버튼을 통해 목표 물건과 기간을 설정하며 생성할 수 있습니다.
- ②번과 같이 구입하기 위해 등록한 사진은 진도율에 따라 선명함의 정도가 달라집니다.
- 그림 밑에 보라색 progressive line을 통해 정산금액까지의 남은 정도를 가시적으로 확인 가능합니다.
- ③번 할일 목록보기를 클릭하면 목록이 펼쳐집니다. 이를 통해 하루동안 할 일을 확인할 수 있습니다. 



### `달력` 화면

![달력](https://user-images.githubusercontent.com/60081201/102710080-321a4280-42f3-11eb-8a9c-56dcf8e2ed3d.JPG)

- 달력을 통해 마라톤과 스프린트에 대한 진행상황을 한눈에 볼 수 있습니다.



### `내정보` 화면

![내정보화면](https://user-images.githubusercontent.com/60081201/102710140-a359f580-42f3-11eb-9e8c-3aee93c275ef.JPG)

- 현재 PACEMAKER로 모인 금액을 확인할 수 있습니다.
- 하단에는 전반적인 진행상황을 블럭 형태로 제공합니다.



## 기대 효과

### 기업 측면

- 소비자들의 목표 물건 패턴을 분석하여 빅데이터로 활용 가능
- 서비스 측면 상 계좌가 두 개 필요한 점을 통해 은행 계좌 개설을 유도하여 고객 유치 효과

### 사용자 측면

- 개인에게 성취감을 통한 향상된 삶의 질 제공
- 사용자가 생활 습관을 개선하며 합리적인 소비와 저축을 유도하여 효율적인 돈 관리 장려



## :school: 다모아팀 소개

권오정 (팀장) `백엔드 및 배포`

김찬영 `백엔드`

신유빈 `프론트엔드`

유한석 `백엔드`