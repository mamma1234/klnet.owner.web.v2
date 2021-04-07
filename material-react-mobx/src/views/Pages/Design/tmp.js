<main className="app-container">
{/* <!-- content --> */}

<h1 className="sr-only">PLISM CONTENT</h1>
<section id="section1" className="section section--01">
  <div className="section__inner">
    {/* <!-- Swiper --> */}
    <div className="swiper-wrap">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="figure">
              {/* <!-- 이미지 pc, mobile 분기처리 필요 --> */}
              <div className="figure__img is-desktop">
                <img src={bg_section0101.src} alt={bg_section0101.alt} />
              </div>
              <div className="figure__img is-mobile">
                <img src={bg_section0101_mo.src} alt={bg_section0101_mo.alt} />
              </div>
              <div className="figure__caption">
                <strong className="figure__title">선사스케줄, B/K</strong>
                <p className="figure__text">
                  국내 최다 선사 스케줄 보유,
                  <br />
                  한 화면에서 선사의 서비스 스케줄을
                  <br className="is-mobile-wrapline" />
                  확인 하실 수 있습니다.
                  <br />
                  원하는 스케줄을 찾으셨다면,
                  <br className="is-mobile-wrapline" />
                  Booking도 바로 진행해보세요!
                </p>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="figure">
              {/* <!-- 이미지 pc, mobile 분기처리 필요 --> */}
              <div className="figure__img is-desktop">
                <img src={bg_section0102.src} alt={bg_section0102.alt} />
              </div>
              <div className="figure__img is-mobile">
                <img src={bg_section0102_mo.src} alt={bg_section0102_mo.alt} />
              </div>
              <div className="figure__caption">
                <strong className="figure__title">Tracking</strong>
                <p className="figure__text">
                  이제 선사의 B/L 넘버만 등록하시면
                  <br className="is-mobile-wrapline" />
                  내 화물의 상태 뿐 아니라
                  <br className="is-mobile-wrapline" />
                  선박의 위치까지 확인할 수 있습니다.
                  <br />
                  중요한 화물이 있다면,
                  <br className="is-mobile-wrapline" />
                  이제 프리즘 플러스와 함께하세요.
                </p>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="figure">
              {/* <!-- 이미지 pc, mobile 분기처리 필요 --> */}
              <div className="figure__img is-desktop">
                <img src={bg_section0103.src} alt={bg_section0103.alt} />
              </div>
              <div className="figure__img is-mobile">
                <img src={bg_section0103_mo.src} alt={bg_section0103_mo.alt} />
              </div>
              <div className="figure__caption">
                <strong className="figure__title">컨테이너 관리</strong>
                <p className="figure__text">
                  국내에 입항한 컨테이너 화물의
                  <br className="is-mobile-wrapline" />
                  반출, 반납기한의 관리
                  <br />
                  그리고 터미널 경과 보관료까지
                  <br />
                  프리즘 플러스에서 한 번에 관리하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Add buttons --> */}
        <div className="swiper-controls">
          {/* <!-- Add Arrows --> */}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          {/* <!-- Add Pagination --> */}
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
    {/* <!-- //Swiper --> */}
  </div>
</section>
<section id="section2" className="section section--02">
  <div className="section__inner">
    <div className="search-wrap">
      <form className="search is-left">
        <div className="search__inner">
          {/* <!-- 2021-02-03 div 추가 --> */}
          <h3 className="title">HS코드 찾기</h3>
          <p className="text">품명을 입력해주세요</p>
          <div className="search__box">
            <input
              type="search"
              className="search__box--input"
              placeholder="Search"
            />
            <button type="submit" className="search__box--submit">
              <span className="sr-only">검색</span>
            </button>
          </div>
          {/* <!-- 2021-02-03 validate 추가 --> */}
          {/* <!-- 검색실패 --> */}
          <div className="search-value search-value--fail">
            <p>품명이 올바르지 않거나, 결과가 없습니다.</p>
          </div>
          {/* <!-- 검색결과 --> */}
          {/* <!--
  <div className="search-value search-value--result">
    <ul className="search-value__list">
      <li><strong>품목번호</strong> <span className="system">950300 3493</span></li>
      <li><strong>품명</strong> <span className="system">TV</span></li>
    </ul>
  </div>
  --> */}
          {/* <!-- //2021-02-03 validate 추가 --> */}
        </div>
      </form>
      <form className="search is-right">
        <div className="search__inner">
          {/* <!-- 2021-02-03 div 추가 --> */}
          <h3 className="title">IMO 코드 찾기</h3>
          <p className="text">선박명을 입력해주세요</p>
          <div className="search__box">
            <input
              type="search"
              className="search__box--input"
              placeholder="Search"
            />
            <button type="submit" className="search__box--submit">
              <span className="sr-only">검색</span>
            </button>
          </div>
          {/* <!-- 2021-02-03 validate 추가 --> */}
          {/* <!-- 검색실패 --> */}
          {/* <!--
  <div className="search-value search-value--fail">
    <p>선박명이 올바르지 않거나, 결과가 없습니다.</p>
  </div>
  --> */}
          {/* <!-- 검색결과 --> */}
          <div className="search-value search-value--result">
            <ul className="search-value__list">
              <li>
                <strong>CODE</strong>
                <span className="system">950300 3493</span>
              </li>
              <li>
                <strong>NAME</strong>
                <span className="system">TV</span>
              </li>
            </ul>
          </div>
          {/* <!-- //2021-02-03 validate 추가 --> */}
        </div>
      </form>
    </div>
  </div>
</section>
<section id="section3" className="section section--03">
  <div className="section__inner">
    {/* <!-- Swiper --> */}
    <div className="swiper-wrap">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            {/* <!-- booking module --> */}
            <div className="booking-module">
              <div className="booking-module__head">
                <h2 className="booking-module__title">
                  PNIT 부산신항국제터미널
                </h2>
                <p className="booking-module__date">
                  2021-01-05 14:32 현재
                </p>
                {/* <!-- 
          원활 클래스: is-want
          난항 클래스: is-difficult
        --> */}
                <span className="booking-module__state is-want">원할</span>
                {/* <!-- 난항
        <span className="booking-module__state is-difficult">난항</span>
        --> */}
              </div>
              <ul className="booking-module__count">
                <li className="booking-module__count--item">
                  <em>20</em>
                  <span className="system">1248</span>
                </li>
                <li className="booking-module__count--item">
                  <em>40</em>
                  <span className="system">3242</span>
                </li>
                <li className="booking-module__count--item">
                  <em>40HC</em>
                  <span className="system">3202</span>
                </li>
                <li className="booking-module__count--item">
                  <em>ETC</em>
                  <span className="system">1234</span>
                </li>
              </ul>
              <div className="booking-module__status">
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- //booking module --> */}
          </div>
          <div className="swiper-slide">
            {/* <!-- booking module --> */}
            <div className="booking-module">
              <div className="booking-module__head">
                <h2 className="booking-module__title">
                  PNIT 부산신항국제터미널2
                </h2>
                <p className="booking-module__date">
                  2021-01-05 14:32 현재
                </p>
                {/* <!-- 
          원활 클래스: is-want
          난항 클래스: is-difficult
        --> */}
                <span className="booking-module__state is-want">원할</span>
                {/* <!-- 난항
        <span className="booking-module__state is-difficult">난항</span>
        --> */}
              </div>
              <ul className="booking-module__count">
                <li className="booking-module__count--item">
                  <em>20</em>
                  <span className="system">1248</span>
                </li>
                <li className="booking-module__count--item">
                  <em>40</em>
                  <span className="system">3242</span>
                </li>
                <li className="booking-module__count--item">
                  <em>40HC</em>
                  <span className="system">3202</span>
                </li>
                <li className="booking-module__count--item">
                  <em>ETC</em>
                  <span className="system">1234</span>
                </li>
              </ul>
              <div className="booking-module__status">
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- //booking module --> */}
          </div>
          <div className="swiper-slide">
            {/* <!-- booking module --> */}
            <div className="booking-module">
              <div className="booking-module__head">
                <h2 className="booking-module__title">
                  PNIT 부산신항국제터미널3
                </h2>
                <p className="booking-module__date">
                  2021-01-05 14:32 현재
                </p>
                {/* <!-- 
          원활 클래스: is-want
          난항 클래스: is-difficult
        --> */}
                <span className="booking-module__state is-want">원할</span>
                {/* <!-- 난항
        <span className="booking-module__state is-difficult">난항</span>
        --> */}
              </div>
              <ul className="booking-module__count">
                <li className="booking-module__count--item">
                  <em>20</em>
                  <span className="system">1248</span>
                </li>
                <li className="booking-module__count--item">
                  <em>40</em>
                  <span className="system">3242</span>
                </li>
                <li className="booking-module__count--item">
                  <em>40HC</em>
                  <span className="system">3202</span>
                </li>
                <li className="booking-module__count--item">
                  <em>ETC</em>
                  <span className="system">1234</span>
                </li>
              </ul>
              <div className="booking-module__status">
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
                <div className="booking-module__status--item">
                  <span className="booking-module__status--bar">
                    <span
                      className="booking-module__status--system"
                      style="width: 40%"
                    ></span>
                    <span className="booking-module__status--per">40%</span>
                  </span>
                  <div className="booking-module__status--caption">
                    <em className="booking-module__status--subject">
                      BNUS-001
                    </em>
                    <span className="booking-module__status--text">
                      XIN FU ZHOU
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- //booking module --> */}
          </div>
        </div>
      </div>
      {/* <!-- Add buttons --> */}
      <div className="swiper-controls">
        {/* <!-- Add Arrows --> */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        {/* <!-- Add Pagination --> */}
        <div className="swiper-pagination"></div>
      </div>
    </div>
    {/* <!-- //Swiper --> */}
  </div>
</section>
<section id="section4" className="section section--04">
  <div className="section__inner">
    <h3 className="title">서비스 공지사항</h3>
    {/* <!-- Swiper --> */}
    <div className="swiper-wrap">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="notice">
              <strong className="notice__title">
                케이엘넷, KCTC 및 씨앤티알과 '샷시관제서비스'
                업무협약체결1
              </strong>
              <p className="notice__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec eleifend ornare venenatis. Curabitur eget rutrum
                magna, eget faucibus enim. Ut nec congue turpis. Sed
                magna augue, feugiat vel mauris in, vehicula tempor
                augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                sit amet nunc sapien. Nullam at lorem sed velit sodales
                elementum et nec tortor. Donec non elementum odio.
                Vestibulum pharetra ultricies neque,
              </p>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="notice">
              <strong className="notice__title">
                케이엘넷, KCTC 및 씨앤티알과 '샷시관제서비스'
                업무협약체결2
              </strong>
              <p className="notice__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec eleifend ornare venenatis. Curabitur eget rutrum
                magna, eget faucibus enim. Ut nec congue turpis. Sed
                magna augue, feugiat vel mauris in, vehicula tempor
                augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                sit amet nunc sapien. Nullam at lorem sed velit sodales
                elementum et nec tortor. Donec non elementum odio.
                Vestibulum pharetra ultricies neque,
              </p>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="notice">
              <strong className="notice__title">
                케이엘넷, KCTC 및 씨앤티알과 '샷시관제서비스'
                업무협약체결3
              </strong>
              <p className="notice__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec eleifend ornare venenatis. Curabitur eget rutrum
                magna, eget faucibus enim. Ut nec congue turpis. Sed
                magna augue, feugiat vel mauris in, vehicula tempor
                augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                sit amet nunc sapien. Nullam at lorem sed velit sodales
                elementum et nec tortor. Donec non elementum odio.
                Vestibulum pharetra ultricies neque,
              </p>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="notice">
              <strong className="notice__title">
                케이엘넷, KCTC 및 씨앤티알과 '샷시관제서비스'
                업무협약체결1
              </strong>
              <p className="notice__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec eleifend ornare venenatis. Curabitur eget rutrum
                magna, eget faucibus enim. Ut nec congue turpis. Sed
                magna augue, feugiat vel mauris in, vehicula tempor
                augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                sit amet nunc sapien. Nullam at lorem sed velit sodales
                elementum et nec tortor. Donec non elementum odio.
                Vestibulum pharetra ultricies neque,
              </p>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="notice">
              <strong className="notice__title">
                케이엘넷, KCTC 및 씨앤티알과 '샷시관제서비스'
                업무협약체결2
              </strong>
              <p className="notice__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec eleifend ornare venenatis. Curabitur eget rutrum
                magna, eget faucibus enim. Ut nec congue turpis. Sed
                magna augue, feugiat vel mauris in, vehicula tempor
                augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                sit amet nunc sapien. Nullam at lorem sed velit sodales
                elementum et nec tortor. Donec non elementum odio.
                Vestibulum pharetra ultricies neque,
              </p>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="notice">
              <strong className="notice__title">
                케이엘넷, KCTC 및 씨앤티알과 '샷시관제서비스'
                업무협약체결3
              </strong>
              <p className="notice__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec eleifend ornare venenatis. Curabitur eget rutrum
                magna, eget faucibus enim. Ut nec congue turpis. Sed
                magna augue, feugiat vel mauris in, vehicula tempor
                augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                sit amet nunc sapien. Nullam at lorem sed velit sodales
                elementum et nec tortor. Donec non elementum odio.
                Vestibulum pharetra ultricies neque,
              </p>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="notice">
              <strong className="notice__title">
                케이엘넷, KCTC 및 씨앤티알과 '샷시관제서비스'
                업무협약체결1
              </strong>
              <p className="notice__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec eleifend ornare venenatis. Curabitur eget rutrum
                magna, eget faucibus enim. Ut nec congue turpis. Sed
                magna augue, feugiat vel mauris in, vehicula tempor
                augue. Fusce ac faucibus tellus, eget mollis ipsum. Ut
                sit amet nunc sapien. Nullam at lorem sed velit sodales
                elementum et nec tortor. Donec non elementum odio.
                Vestibulum pharetra ultricies neque,
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Add buttons --> */}
      <div className="swiper-controls">
        {/* <!-- Add Arrows --> */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        {/* <!-- Add Pagination --> */}
        <div className="swiper-pagination"></div>
      </div>
    </div>
    {/* <!-- //Swiper --> */}
  </div>
</section>

{/* <!-- //content --> */}
</main>
