<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="apple-touch-icon" sizes="152x152" href="../images/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../images/favicon/favicon-16x16.png">
  <link rel="manifest" href="../images/favicon/site.webmanifest">
  <link rel="mask-icon" href="../images/favicon/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">
  <title>Document</title>
  <link href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../src/css/style.css">
</head>

<body>
  <div class="banner">
    <header id="header">
      <div class="first-header-line">
        <div class="container">
          <div class="header-wrap flex-aic">
            <nav>
              <ul class="nav-menu flex-aic" id="headerNavMenu">
                <li class="dropdown">
                  <!-- data-attr - користувацький атрібут, який ми можем створювати для відокремлювання елементів -->
                  <div class="dropdown-link">
                    <a href="/about.php">Про Нас</a>
                    <!--<img src="images/arrow-down.svg" id="openSubMenu" data-attr="about" />-->
                    <svg id="openSubMenu" data-attr="about" width="12" height="12" viewBox="0 0 12 12" fill="#84C551" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_109_4576)">
                        <path d="M5.96404 9.42018C5.75026 9.42018 5.53651 9.33806 5.37353 9.17417L0.244696 4.01439C-0.0815652 3.68616 -0.0815652 3.154 0.244696 2.8259C0.570824 2.49781 1.09969 2.49781 1.42598 2.8259L5.96404 7.39157L10.5021 2.82606C10.8284 2.49797 11.3572 2.49797 11.6833 2.82606C12.0097 3.15416 12.0097 3.68632 11.6833 4.01455L6.55455 9.17433C6.39149 9.33824 6.17774 9.42018 5.96404 9.42018Z" />
                      </g>
                      <defs>
                        <clipPath id="clip0_109_4576">
                          <rect width="11.9281" height="12" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <ul class="dropdown-menu" data-attr="about">
                    <li><a href="/about-aur-team.php">Наша команда</a></li>
                    <li><a href="/about-partners.php">Партнери</a></li>
                    <li><a href="/about-dogovir.php">Договір</a></li>
                    <li><a href="/about-kodex.php">Кодекс</a></li>
                    <li><a href="/about-policy.php">Політика</a></li>
                  </ul>
                </li>
                <li><a href="/catalog.php">Каталог продукції </a></li>
                <li><a href="/payment.php">Оплата і доставка</a></li>
                <li><a href="/partners.php">Партнери</a></li>
                <li><a href="/news.php">Новини</a></li>
                <li><a href="/contacts.php">Контакти</a></li>
              </ul>
            </nav>
            <div class="auth flex-aic">
              <div class="flex-aic">
                <img src="images/logOut.svg" alt="Вихід з акаунту" />
              </div>
              <div class="login flex-aic">
                <a href="#">Вхід</a>
                <a href="/registration.php">Реєстрація</a>
              </div>
            </div>
          </div>
          <div class="toggle-wrap">
            <img src="images/menu.svg" id="openMobileMenu" />
          </div>
        </div>
      </div>
      <div class="container" id="headerSecondLine">
        <div class="second-header-line">
          <div class="logo flex-aic" id="logo">
            <a href="/">
              <img src="images/logo_desktop.png" alt="" />
            </a>
          </div>
          <div class="search-area">
            <input name="search" placeholder="Пошук" />
            <div class="search-v-line"></div>
          </div>
          <div class="phones" id="phoneWrap">
            <div class="header-icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 463.009 463.009" fill="#8C3213" width="20px" height="20px">
                <g>
                  <path d="m462.692,381.085c-1.472-11.126-7.895-20.719-17.62-26.318l-114.226-65.767c-13.99-8.055-31.738-5.71-43.157,5.708l-22.499,22.499c-5.987,5.988-15.459,6.518-22.028,1.231-17.737-14.272-35.201-29.979-51.906-46.685-16.705-16.705-32.412-34.168-46.685-51.906-5.287-6.57-4.758-16.041 1.231-22.029l22.498-22.499c11.418-11.417 13.766-29.163 5.709-43.156l-65.767-114.226c-5.6-9.726-15.192-16.148-26.318-17.62-11.127-1.475-22.06,2.236-29.996,10.172l-33.901,33.902c-23.661,23.662-24.041,66.944-1.07,121.875 22.088,52.818 63.308,110.962 116.065,163.721 52.759,52.758 110.903,93.978 163.722,116.066 27.039,11.307 51.253,16.957 71.697,16.956 21.088,0 38.163-6.013 50.178-18.027l33.901-33.902c7.935-7.936 11.643-18.869 10.172-29.995zm-139.33-79.086l114.226,65.767c5.649,3.252 9.379,8.824 10.233,15.286 0.718,5.423-0.691,10.763-3.885,15.066l-151.805-86.638 6.165-6.165c6.631-6.631 16.941-7.994 25.066-3.316zm-243.406-286.811c6.463,0.855 12.034,4.585 15.286,10.234l65.767,114.226c4.68,8.127 3.316,18.435-3.315,25.065l-5.663,5.663-87.114-151.303c3.561-2.637 7.82-4.069 12.26-4.069 0.921-1.77636e-15 1.85,0.061 2.779,0.184zm328.055,419.187c-18.798,18.798-57.244,18.01-105.48-2.162-51.06-21.352-107.491-61.424-158.901-112.833-51.41-51.41-91.482-107.842-112.834-158.901-20.173-48.237-20.96-86.683-2.162-105.482l25.167-25.168 87.245,151.532-5.851,5.851c-11.415,11.416-12.409,29.488-2.311,42.04 14.609,18.156 30.68,36.024 47.764,53.108 17.086,17.085 34.954,33.156 53.109,47.765 12.55,10.098 30.622,9.105 42.04-2.312l5.338-5.338 152.016,86.759-25.14,25.141z" />
                </g>
              </svg>
            </div>
            <div>
              <div class="tel-number">
                <a href="tel:+380671150058">+38 (067) 115 00 58</a>
                <img src="images/arrow-down.svg" alt="" id="phonesShow" />
              </div>
              <!-- <a href="#">Замовити зворотній зв’язок</a> -->
              <div class="other-phones">
                <a href="tel:+380501150058">+38 (050) 115 00 58</a>
                <a href="tel:+380671150058">+38 (067) 115 00 58</a>
              </div>
            </div>
          </div>
          <div class="header-icon-group">
            <div class="heart-img header-icon">
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#8c3213" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 
            4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 
            9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 
            10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 
            19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z" />
              </svg>
            </div>
            <div class="header-icon counter-compare">
              <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg" fill="#8C3213">
                <g>
                  <path d="m27.492 17.5a.5.5 0 0 0 -.021-.12.454.454 0 0 0 -.014-.082l-3.832-8.622 2.184.335a.487.487 0 0 
            0 .076.006.5.5 0 0 0 .075-.995l-9.46-1.451v-1.571a.5.5 0 0 0 -1 0v1.418l-9.309-1.429a.5.5 0 0 0 -.151.989l2.476.379-3.973 8.943a.454.454 0 0 0 
            -.014.082.361.361 0 0 0 0 .24.549.549 0 0 0 .014.081 4.812 4.812 0 0 0 4.457 2.797 4.812 4.812 0 0 0 4.458-2.8.549.549 0 0 0 .014-.081.361.361 0 0 0 0-.24.454.454 0 0 0 
            -.014-.082l-3.9-8.78 5.945.912v19.071h-5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-5v-18.918l5.954.914-3.911 8.8a.454.454 0 0 0 -.014.082.361.361 0 0 0 0 .24.549.549 0 0 0 .014.081 
            4.949 4.949 0 0 0 8.916 0 .549.549 0 0 0 .014-.081.494.494 0 0 0 .016-.118zm-18.492 0a3.9 3.9 0 0 1 -3.131-1.5h6.262a3.9 3.9 0 0 1 -3.131 1.5zm-3.23-2.5 3.23-7.269 3.23 
            7.269zm17.23-5.269 3.23 7.269h-6.46zm0 9.769a3.9 3.9 0 0 1 -3.131-1.5h6.262a3.9 3.9 0 0 1 -3.131 1.5z" />
                </g>
              </svg>
              <div class="counter"></div>
            </div>
            <div class="basket-price">
              <div class="header-icon counter-backet" id="backet">
                <svg height="18" viewBox="0 0 32 32" width="18" xmlns="http://www.w3.org/2000/svg" fill="#8C3213">
                  <path d="m3 4h2.08a1.26 1.26 0 0 1 1.25 1.05l.67 4.09v.06l2 12a1 1 0 0 0 1 .8h16a1 1 0 0 0 1-.76l3-12a1 1 
              0 0 0 -1-1.24h-20.15l-.55-3.27a3.25 3.25 0 0 0 -3.22-2.73h-2.08a1 1 0 0 0 0 2zm24.72 6-2.5 10h-14.37l-1.67-10z" />
                  <path d="m24 24a3 3 0 1 0 3 3 3 3 0 0 0 -3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z" />
                  <path d="m9 27a3 3 0 1 0 3-3 3 3 0 0 0 -3 3zm4 0a1 1 0 1 1 -1-1 1 1 0 0 1 1 1z" />
                </svg>
                <div class="counter"></div>
              </div>
              <p>0,0 грн</p>
            </div>
          </div>
        </div>
        <div class="third-header-line">
          <div class="menu-item mobile">
            <a href="#">
              <svg fill="#84BE51" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 51.519 51.519" xml:space="preserve">
                <g>
                  <path d="M47.392,21.778l-0.38-1.521l-1.415,1.145c-0.508-1.412-1.039-2.263-1.283-2.61l-0.271-0.386l-0.469-0.036
                c-0.314-0.023-1.003-0.043-1.99,0.081l0.624-1.909l-1.745,0.425c-0.486,0.118-1.022,0.271-1.596,0.461
                c0-0.003,0.001-0.005,0.001-0.008C39.09,5.93,34.252,0.83,33.7,0.286c-0.01-0.01-0.024-0.012-0.035-0.021
                c-0.012-0.011-0.017-0.026-0.029-0.036c-0.066-0.055-0.143-0.081-0.217-0.116c-0.037-0.017-0.067-0.044-0.106-0.057
                c-0.134-0.045-0.274-0.065-0.412-0.051c-0.002,0-0.003-0.001-0.005-0.001c-0.771,0.079-7.738,1.036-14.795,10.203
                c-0.4,0.617-0.772,1.258-1.131,1.911c-3.203-2.297-5.655-2.888-6.377-3.014C10.3,9.052,9.998,9.135,9.772,9.329
                c-0.367,0.314-2.516,2.278-4.225,6.505c-0.023,0.047-0.04,0.093-0.056,0.144c-1.01,2.543-1.857,5.884-2.072,10.164
                c0.078,2.485,0.466,5.013,1.153,7.511c0.684,2.499,1.641,4.87,2.886,7.12c2.879,4.333,5.504,5.412,7.644,5.412
                c1.275,0,2.377-0.383,3.258-0.688c0.464-0.161,2.474-0.725,2.8-0.8c0.996,2.025,2.716,2.862,3.967,3.468
                c0.442,0.214,2.576,1.429,2.985,1.699c1.068,0.706,2.505,1.656,4.491,1.656c1.887,0,4.269-0.857,7.299-3.599
                c1.703-1.813,3.216-3.874,4.496-6.127c1.284-2.252,2.284-4.605,2.993-7.075C48.585,28.801,48.05,24.416,47.392,21.778z
                M40.883,20.592c0.91-0.187,1.607-0.234,2.052-0.24c0.262,0.455,0.649,1.24,1.003,2.392l-5.111,4.136L40.883,20.592z M30.512,2.678
                c-0.795,1.19-1.588,2.541-2.442,4.161C27.813,7.328,28,7.932,28.488,8.19c0.149,0.078,0.308,0.115,0.465,0.115
                c0.359,0,0.707-0.194,0.886-0.534c1.13-2.145,2.143-3.792,3.194-5.195c1.357,1.792,3.999,6.367,3.839,14.723
                c-0.032,0.313-0.072,0.627-0.116,0.939c-0.026,0.012-0.052,0.025-0.079,0.037c-0.265,0.118-0.537,0.245-0.813,0.38
                c-0.181,0.088-0.361,0.18-0.541,0.273c-0.105,0.054-0.21,0.109-0.316,0.165c-1.018,0.54-2.031,1.159-3.036,1.856
                c-0.066,0.045-0.131,0.091-0.197,0.137c-0.231,0.162-0.461,0.328-0.691,0.499c-0.096,0.071-0.192,0.145-0.289,0.218
                c-0.212,0.161-0.424,0.323-0.636,0.491c-0.136,0.108-0.273,0.222-0.41,0.334c-0.178,0.146-0.357,0.289-0.535,0.44
                c-0.319,0.271-0.641,0.551-0.965,0.844c-0.426,0.453-0.839,0.921-1.24,1.405c-0.828,0.998-1.601,2.06-2.317,3.176
                c-0.001,0.001-0.002,0.002-0.003,0.003c-0.326,0.506-0.638,1.021-0.936,1.543c-0.04,0.071-0.076,0.147-0.116,0.218
                c-0.341,0.608-0.658,1.225-0.957,1.848c-0.006,0.012-0.014,0.029-0.024,0.051l-0.022,0.048l0,0c-0.01,0.021-0.019,0.043-0.03,0.065
                l-0.001,0c-0.001,0.001,0,0.003-0.001,0.004c-0.035,0.073-0.067,0.147-0.101,0.22c0.789-6.431,2.232-12.468,4.312-17.963
                c0.196-0.517-0.064-1.094-0.581-1.29c-0.517-0.195-1.094,0.065-1.289,0.581c-2.203,5.819-3.708,12.222-4.498,19.042
                c-0.18-0.055-0.352-0.111-0.545-0.165c-2.201-0.611-4.939-1.373-4.813-8.044c0.235-2.316,0.764-4.655,1.573-6.952
                c0.422-1.206,0.944-2.43,1.549-3.638c0.003-0.005,0.002-0.011,0.005-0.016c0.471-0.939,0.975-1.843,1.52-2.687
                C23.922,5.922,27.973,3.638,30.512,2.678z M20.544,42.784c-0.382,0.095-2.19,0.597-2.839,0.822
                c-2.159,0.751-4.843,1.685-8.537-3.871c-1.127-2.041-2.024-4.265-2.666-6.612c-0.646-2.347-1.01-4.717-1.084-6.962
                c0.189-3.726,0.877-6.654,1.711-8.92c1.504-0.069,3.002-0.277,4.461-0.637c0.536-0.132,0.864-0.674,0.731-1.21
                c-0.132-0.537-0.678-0.866-1.21-0.731c-1.018,0.251-2.058,0.418-3.105,0.515c1.052-2.146,2.145-3.425,2.715-3.999
                c0.909,0.235,2.868,0.911,5.337,2.734c-0.03,0.063-0.055,0.127-0.084,0.191c-0.201,0.436-0.4,0.873-0.583,1.321
                c-0.223,0.54-0.431,1.079-0.619,1.615c-0.86,2.445-1.424,4.939-1.681,7.495c-0.161,8.302,3.867,9.422,6.273,10.091
                c0.473,0.132,1.882,0.731,1.916,0.731c0.008,0,0.037-0.001,0.043-0.002c-0.019,0.055-0.035,0.112-0.054,0.167
                c-0.188,0.529-0.351,1.029-0.49,1.513c-0.007,0.026-0.014,0.053-0.02,0.08c-0.108,0.536-0.19,1.042-0.253,1.525
                c-0.022,0.166-0.031,0.32-0.047,0.481c-0.033,0.317-0.064,0.632-0.078,0.926c-0.008,0.157-0.007,0.307-0.009,0.46
                c-0.005,0.304-0.003,0.598,0.011,0.877c0.006,0.109,0.013,0.218,0.022,0.325c0.029,0.369,0.074,0.717,0.135,1.043
                C20.541,42.762,20.542,42.774,20.544,42.784z M45.45,34.245c-0.645,2.238-1.583,4.444-2.789,6.56
                c-1.203,2.116-2.622,4.05-4.158,5.689c-5.009,4.53-7.381,2.961-9.288,1.701c-0.573-0.379-2.597-1.531-3.216-1.831
                c-1.219-0.591-2.609-1.276-3.269-3.093c-0.005-0.018,0-0.036-0.007-0.054c-0.48-1.395-0.484-3.299-0.013-5.659
                c0.124-0.427,0.266-0.853,0.411-1.277c0.135-0.385,0.282-0.784,0.453-1.221c0.266-0.68,0.555-1.342,0.859-1.987
                c0.022-0.048,0.051-0.111,0.053-0.114c0.001-0.001,0-0.003,0.001-0.005l0.001-0.001c0.315-0.662,0.649-1.305,1-1.921
                c0-0.001,0.001-0.001,0.002-0.002c0.28-0.492,0.575-0.975,0.88-1.451c0,0,0,0,0,0c0.311-0.485,0.634-0.955,0.965-1.414
                c0.003-0.004,0.007-0.007,0.009-0.011c0.002-0.003,0.002-0.005,0.004-0.008c0.726-1.003,1.495-1.946,2.299-2.805
                c0.415-0.375,0.824-0.724,1.23-1.059c0.119-0.098,0.238-0.192,0.357-0.288c0.298-0.239,0.592-0.469,0.884-0.688
                c0.121-0.091,0.242-0.182,0.363-0.27c0.31-0.226,0.615-0.439,0.917-0.642c0.09-0.061,0.18-0.125,0.27-0.185
                c0.797-0.526,1.566-0.978,2.298-1.366c0.149-0.079,0.298-0.149,0.448-0.224c0.209-0.105,0.42-0.214,0.623-0.309
                c0.252-0.118,0.504-0.227,0.757-0.334c0.474-0.202,0.934-0.387,1.363-0.537l-4.333,13.255l10.953-8.865
                C46.189,26.3,46.341,29.813,45.45,34.245z" />
                  <path d="M32.58,25.633c-0.31,0.186-7.597,4.67-8.051,13.724c-0.028,0.552,0.397,1.021,0.948,1.049
                c0.017,0.001,0.034,0.001,0.051,0.001c0.529,0,0.971-0.415,0.998-0.95c0.4-7.965,7.02-12.07,7.086-12.111
                c0.472-0.285,0.623-0.9,0.338-1.372C33.666,25.501,33.052,25.347,32.58,25.633z" />
                </g>
              </svg>
              <p>Насіння</p>
            </a>
          </div>
          <div class="menu-item hidden">
            <a href="#">
              <svg fill="#000000" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                <g transform="translate(1 1)">
                  <g>
                    <path d="M506.054,313.027c-13.884-18.513-27.773-20.287-58.044-5.962c-1.253-4.939-2.922-11.312-5.102-19.638l-0.853-2.56
                l-1.707-1.707c-10.24-9.387-23.04-19.627-31.573-19.627H338.8c-3.413,0-11.947-6.827-16.213-11.093
                c-4.909-4.418-9.817-8.546-14.564-11.262c4.238-15.517,7.054-41.025,6.514-70.093c2.114-4.72,4.229-10.584,6.343-17.633
                c6.409-16.823,13.57-38.911,23.602-52.142c50.19-2.066,89.892-43.057,89.892-93.778V-1h-8.533
                c-51.043,0-92.234,40.207-93.814,90.848c-8.459,10.996-14.998,26.02-20.416,40.548c-2.66-20.874-7.251-42.042-14.351-61.541
                c5.203-18.533,15.235-39.282,23.621-47.669c3.413-3.413,3.413-8.533,0-11.947c-3.413-3.413-8.533-3.413-11.947,0
                c-7.179,7.777-15.194,21.847-21.404,37.208c-5.079-9.849-10.993-18.951-17.849-26.968c-2.56-3.413-8.533-4.267-11.947-0.853
                c-3.413,2.56-4.267,8.533-0.853,11.947c12.259,14.068,21.155,32.065,27.463,51.649c-8.267-6.912-17.738-13.421-27.463-16.662
                c-4.267-0.853-9.387,0.853-10.24,5.973s1.707,9.387,5.973,11.093c13.653,4.267,29.013,20.48,37.547,29.013l1.707,2.56
                c0.163,0.163,0.327,0.312,0.491,0.459c4.156,22.818,5.642,46.042,5.5,66.506c-2.575-3.004-5.42-5.872-8.548-8.62
                c-1.23-40.132-32.625-72.928-73.39-74.559h-8.533v8.533c-0.853,20.48,6.827,40.107,20.48,55.467
                c13.283,14.943,31.417,23.403,51.248,24.638c7.622,7.648,13.295,16.028,17.018,25.708c0.03,0.119,0.07,0.235,0.106,0.352
                c-1.114,11.009-2.7,19.932-4.438,25.811c-15.77,2.224-50.545,10.626-73.321,16.504c-8.533-1.707-57.173-15.36-90.453-25.6
                l-6.827-1.707L93.04,283.16l8.521,2.84c-16.655,5.537-32.136,14.289-42.655,21.009v-17.876H-0.826V511h59.733v-25.6H169.84
                c17.067,0,34.987-1.707,52.053-2.56l110.933-17.067c4.267,0,8.533-0.853,11.947-1.707c10.24-1.707,19.627-6.827,28.16-14.507
                l128.853-102.4C512.027,338.627,513.734,323.267,506.054,313.027z M416.454,16.92c-3.413,34.987-31.573,63.147-67.413,67.413
                C353.307,49.347,381.467,21.187,416.454,16.92z M239.814,150.04c-8.533-9.387-13.653-20.48-15.36-33.28
                c25.6,5.12,44.373,26.453,47.787,51.2C259.44,165.4,248.347,159.427,239.814,150.04z M128.027,247.32
                c85.333,25.6,89.6,24.747,92.16,23.893C260.294,261.827,291.014,255,296.134,255c2.56,0.853,10.24,6.827,14.507,10.24
                c9.387,7.68,18.773,15.36,27.307,15.36h40.96h28.16c2.56,0.853,11.093,6.827,18.773,13.653c0.803,4.82,3.875,14.932,5.656,21.797
                L364.4,357.4c-10.24,5.973-33.28,7.68-54.613,7.68c4.267-7.68,2.56-17.067-5.12-28.16c-13.653-19.627-36.693-31.573-61.44-31.573
                h-33.28c-15.674,0-30.696-3.918-43.351-11.752c-1.922-1.362-3.608-2.488-5.289-3.608c-1.608-1.206-3.267-2.265-4.964-3.216
                c-0.687-0.416-1.321-0.779-1.863-1.05c-0.853-0.853-1.707-0.853-3.413-1.707c-9.387-5.12-20.48-9.387-32.427-12.8L128.027,247.32z
                M41.84,493.933h-25.6V306.2h25.6V319v166.4V493.933z M491.547,335.213L361.84,435.907l-0.853,0.853
                c-5.12,5.973-11.947,9.387-18.773,10.24h-0.853c-3.413,0.853-5.973,0.853-9.387,0.853l-112.64,17.067
                c-16.213,2.56-33.28,3.413-49.493,3.413H58.907v-140.8c17.802-12.61,56.235-34.885,81.674-28.166
                c3.117,1.365,5.143,2.343,5.366,2.566c0,0,3.388,1.936,7.793,4.44c4.083,2.777,8.456,5.239,13.041,7.371
                c3.08,1.725,5.541,3.083,6.473,3.549l1.707,0.853c4.267,1.707,8.533,2.56,11.947,3.413c0,0,10.24,1.707,14.507,1.707
                c2.56,0,4.267,0,6.827,0h1.707h33.28c19.627,0,37.547,8.533,47.787,26.453c0.592,0.592,2.822,3.642,4.136,5.459
                c0.555,2.174,0.563,3.917,0.131,4.781c-1.821,3.035-7.537,4.771-14.675,5.83c-0.747,0.09-1.295,0.143-1.539,0.143
                c-0.853,0-1.707,0-2.56,0c-2.56,0-4.267,0-5.973,0v0.853c-3.123,0-6.187,0-8.533,0h-73.387c-26.453,0-42.667,12.8-42.667,34.133
                c0,5.12,3.413,8.533,8.533,8.533s8.533-3.413,8.533-8.533c0-4.267,0-17.067,25.6-17.067h72.533v0c2.56,0,5.973,0,11.093,0
                c0.853,0,2.56,0,4.267,0c40.107,0.853,77.653,0,97.28-10.24l73.387-45.227c35.84-17.92,39.253-13.653,46.08-3.413
                C494.96,327.533,494.96,332.653,491.547,335.213z" />
                  </g>
                </g>
              </svg>
              <p>Засоби захисту рослин</p>
            </a>
          </div>
          <div class="menu-item hidden">
            <a href="#">
              <svg fill="#000000" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.432 512.432" xml:space="preserve">
                <g transform="translate(1 1)">
                  <g>
                    <g>
                      <path d="M453.189,7.53c-5.973-6.827-15.36-10.24-24.747-7.68h-0.853l-44.373,17.067c-18.773,5.12-38.4,7.68-58.027,7.68H185.242
                    c-19.627,0-39.253-2.56-58.027-7.68L82.842-0.15h-0.853c-8.533-2.56-18.773,0.853-24.747,7.68
                    c-6.827,7.68-8.533,17.067-4.267,25.6l23.04,59.733c-22.187,101.547-22.187,209.92,0,323.413l-20.48,58.88
                    c-3.413,8.533-1.707,18.773,4.267,25.6c5.12,5.973,11.947,9.387,19.627,9.387c1.707,0,3.413,0,5.12,0l50.347-8.533
                    c3.413-0.853,6.827-0.853,10.24-1.707c4.267,0,7.68-0.853,11.947-1.707c14.507-2.56,29.867-4.267,43.52-4.267h109.227
                    c13.653,0,29.013,1.707,43.52,5.12c3.413,0.853,7.68,0.853,11.947,1.707c3.413,0.853,6.827,0.853,10.24,1.707l50.347,8.533
                    c9.387,1.707,17.92-1.707,23.893-8.533c5.973-7.68,7.68-17.067,4.267-25.6l-19.627-59.733
                    c22.187-117.76,22.187-226.133,0-323.413l23.04-59.733C461.722,24.597,460.016,15.21,453.189,7.53z M442.096,27.157
                    L417.349,89.45c0,1.707,0,3.413,0,5.12c22.187,96.427,22.187,203.947,0,320.853c0,1.707,0,3.413,0,4.267l21.333,62.293
                    c0.853,2.56,0,5.973-1.707,8.533c-0.853,0.853-3.413,3.413-7.68,2.56l-50.347-8.533c-3.413-0.853-6.827-0.853-10.24-1.707
                    c-4.267-0.853-8.533-0.853-11.947-1.707c-16.213-2.56-32.427-4.267-46.933-4.267H200.602c-15.36,0-30.72,1.707-46.933,4.267
                    c-4.267,0.853-7.68,0.853-11.947,1.707c-3.413,0.853-6.827,0.853-10.24,1.707l-50.347,8.533c-4.267,0.853-6.827-1.707-7.68-2.56
                    c-1.707-2.56-2.56-5.973-0.853-9.387l20.48-61.44c0-1.707,0-2.56,0-4.267c-22.187-112.64-22.187-221.013,0-320.853
                    c0-1.707,0-3.413,0-4.267L68.336,28.01c-1.707-3.413-0.853-6.827,1.707-9.387c0.853-0.853,2.56-2.56,5.12-2.56
                    c0.853,0,1.707,0,1.707,0l44.373,17.92h0.853c20.48,5.12,41.813,7.68,63.147,7.68h139.947c21.333,0,42.667-2.56,62.293-8.533
                    h0.853l44.373-17.067c4.267-0.853,6.827,1.707,7.68,2.56C442.949,21.183,443.802,24.597,442.096,27.157z" />
                      <path d="M349.082,75.797H161.349c-5.12,0-8.533,3.413-8.533,8.533v136.533c0,5.12,3.413,8.533,8.533,8.533h187.733
                    c5.12,0,8.533-3.413,8.533-8.533V84.33C357.616,79.21,354.202,75.797,349.082,75.797z M340.549,212.33H169.882V92.863h170.667
                    V212.33z" />
                      <path d="M229.616,135.53h51.2c5.12,0,8.533-3.413,8.533-8.533s-3.413-8.533-8.533-8.533h-51.2c-5.12,0-8.533,3.413-8.533,8.533
                    S224.496,135.53,229.616,135.53z" />
                      <path d="M204.016,178.197h102.4c5.12,0,8.533-3.413,8.533-8.533s-3.413-8.533-8.533-8.533h-102.4
                    c-5.12,0-8.533,3.413-8.533,8.533S198.896,178.197,204.016,178.197z" />
                      <path d="M264.064,336.058c-4.703,3.261-8.435,6.724-11.463,10.241c-2.654-17.329-7.452-35.153-15.305-52.049
                    c-1.707-4.267-6.827-5.973-11.093-4.267c-4.267,1.707-5.973,6.827-4.267,11.093c9.53,20.647,14.091,43.067,15.712,63.828
                    c-3.67-3.371-7.575-6.523-11.436-9.57c-1.142-40.214-32.57-73.105-73.396-74.738h-8.533v8.533
                    c-0.853,20.48,6.827,40.107,20.48,55.467c13.359,15.028,31.623,23.502,51.588,24.66c9.528,7.421,18.121,14.883,21.865,22.946
                    c-0.807,22.681-4.631,40.495-7.746,47.114c-1.707,4.267,0,9.387,4.267,11.093c0.853,0.853,2.56,0.853,3.413,0.853
                    c3.413,0,5.973-1.707,7.68-5.12c4.649-10.227,10.055-36.411,9.464-67.924c0.22-0.929,0.921-2.339,1.63-3.756
                    c4.117-9.057,7.465-18.109,19.191-25.633c34.414-0.695,62.749-29.459,64.435-68.234v-8.533h-8.533
                    C297.489,271.241,267.726,298.933,264.064,336.058z M176.709,331.797c-8.533-9.387-13.653-20.48-15.36-33.28
                    c25.6,5.12,45.227,26.453,47.787,51.2C196.336,347.157,185.242,341.183,176.709,331.797z M282.522,331.797
                    c4.267-22.187,19.627-38.4,40.107-41.813C318.362,311.317,302.149,328.383,282.522,331.797z" />
                    </g>
                  </g>
                </g>
              </svg>
              <p>Добрива</p>
            </a>
          </div>
          <div class="menu-item hidden">
            <a href="#">
              <svg fill="#000000" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                <g transform="translate(1 1)">
                  <g>
                    <g>
                      <path d="M237.933,365.827c0-5.12-3.413-8.533-8.533-8.533h-42.667c-5.12,0-8.533,3.413-8.533,8.533s3.413,8.533,8.533,8.533
                  H229.4C234.52,374.36,237.933,370.947,237.933,365.827z" />
                      <path d="M169.667,417.027H101.4c-5.12,0-8.533,3.413-8.533,8.533s3.413,8.533,8.533,8.533h68.267c5.12,0,8.533-3.413,8.533-8.533
                  S174.787,417.027,169.667,417.027z" />
                      <path d="M255,408.493h93.867c5.12,0,8.533-3.413,8.533-8.533c0-5.12-3.413-8.533-8.533-8.533H255
                  c-5.12,0-8.533,3.413-8.533,8.533C246.467,405.08,249.88,408.493,255,408.493z" />
                      <path d="M434.2,434.093h-93.867c-5.12,0-8.533,3.413-8.533,8.533s3.413,8.533,8.533,8.533H434.2c5.12,0,8.533-3.413,8.533-8.533
                  S439.32,434.093,434.2,434.093z" />
                      <path d="M263.533,459.693H203.8c-5.12,0-8.533,3.413-8.533,8.533s3.413,8.533,8.533,8.533h59.733c5.12,0,8.533-3.413,8.533-8.533
                  S268.653,459.693,263.533,459.693z" />
                      <path d="M502.467,306.093H434.2c-24.725,0-49.436,7.016-70.36,19.742c-5.597-70.808,9.426-154.036,22.563-187.78
                  c18.207,6.775,33.257,10.172,46.944,10.172c9.387,0,18.773-2.56,26.453-5.12c20.48-8.533,35.84-28.16,50.347-63.147
                  c0.853-2.56,0.853-5.12,0-6.827c-0.853-1.707-2.56-3.413-4.267-4.267c-46.401-19.631-77.455-18.103-101.84,7.746
                  c0.132-34.042-21.785-56.873-68.827-76.866c-2.56-0.853-5.12-0.853-6.827,0s-3.413,2.56-4.267,4.267
                  c-27.029,63.887-13.954,98.684,47.505,127.032c-14.708,37.464-29.088,121.374-24.337,192.634
                  c-20.115-11.359-43.396-17.586-66.688-17.586h-85.333c-24.725,0-49.436,7.016-70.36,19.742
                  c-5.597-70.808,9.426-154.036,22.563-187.78c18.207,6.775,33.258,10.172,46.944,10.172c9.387,0,18.773-2.56,26.453-5.12
                  c20.48-8.533,35.84-28.16,50.347-63.147c0.853-2.56,0.853-5.12,0-6.827c-0.853-1.707-2.56-3.413-4.267-4.267
                  c-46.401-19.631-77.455-18.103-101.84,7.746c0.132-34.042-21.785-56.873-68.827-76.866c-2.56-0.853-5.12-0.853-6.827,0
                  s-3.413,2.56-4.267,4.267C58.158,67.9,71.232,102.697,132.692,131.045c-14.708,37.464-29.088,121.374-24.337,192.634
                  c-20.115-11.359-43.396-17.586-66.688-17.586H7.533c-5.12,0-8.533,3.413-8.533,8.533V502.36c0,5.12,3.413,8.533,8.533,8.533
                  h494.933c5.12,0,8.533-3.413,8.533-8.533V314.627C511,309.507,507.587,306.093,502.467,306.093z M491.373,79.96
                  c-11.947,26.453-23.893,40.96-38.4,46.933c-14.507,6.827-33.28,5.12-58.88-4.267C417.133,72.28,441.88,62.04,491.373,79.96z
                  M336.067,18.52c50.347,23.04,60.587,47.787,41.813,96.427C328.387,92.76,317.293,68.013,336.067,18.52z M252.44,79.96
                  c-11.947,26.453-23.893,40.96-38.4,46.933c-14.507,6.827-33.28,5.12-58.88-4.267C178.2,72.28,202.947,62.04,252.44,79.96z
                  M97.133,18.52C147.48,41.56,157.72,66.307,139.8,115.8C89.453,92.76,79.213,68.013,97.133,18.52z M16.067,493.827v-34.133H50.2
                  c5.12,0,8.533-3.413,8.533-8.533c0-5.12-3.413-8.533-8.533-8.533H16.067v-59.733h76.8c5.12,0,8.533-3.413,8.533-8.533
                  s-3.413-8.533-8.533-8.533h-76.8V323.16h25.6c25.6,0,51.2,8.533,71.68,23.893c3.413,2.56,6.827,2.56,10.24,0
                  c20.48-15.36,46.08-23.893,71.68-23.893H280.6c25.6,0,51.2,8.533,71.68,23.893c3.413,2.56,6.827,2.56,10.24,0
                  c20.48-15.36,46.08-23.893,71.68-23.893h59.733v68.267H434.2c-5.12,0-8.533,3.413-8.533,8.533c0,5.12,3.413,8.533,8.533,8.533
                  h59.733v85.333H16.067z" />
                    </g>
                  </g>
                </g>
              </svg>
              <p>Кормова група</p>
            </a>
          </div>
          <div class="menu-item hidden">
            <a href="#">
              <svg fill="#000000" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                <g transform="translate(1 1)">
                  <g>
                    <g>
                      <path d="M267.909,343.026v-38.432c30.52-15.467,51.452-47.055,52.053-83.727v-0.022c18.382-0.458,33.28-15.598,33.28-32.405
                  c0-19.096-14.659-34.658-33.28-34.574V152.6c0-5.689-0.634-11.378-1.698-17.067h103.245c4.267,0,7.68-2.56,8.533-6.827
                  c0.853-3.413-0.853-7.68-4.267-9.387l-34.987-19.627c-21.303-12.091-42.608-26.907-65.745-46.009
                  c10.907-12.622,27.058-20.551,45.265-20.551c5.12,0,8.533-3.413,8.533-8.533s-3.413-8.533-8.533-8.533
                  c-23.404,0-44.224,10.285-58.267,26.6c-7.108-6.174-14.405-12.746-21.946-19.773C273.882,7.533,249.989-1,225.242-1
                  c-24.747,0-48.64,8.533-64.853,24.747c-37.547,34.987-69.12,58.88-100.693,76.8l-34.987,19.627
                  c-3.413,1.707-5.12,5.973-4.267,9.387s4.267,5.973,8.533,5.973h104.098c-1.058,5.659-1.689,11.318-1.696,16.977
                  c-18.583,0.076-34.135,15.649-34.135,34.223c0,18.773,15.36,34.133,34.133,34.133c0,36.664,20.745,68.246,51.2,83.716v37.668
                  C104.474,354.941,46.042,422.3,46.042,502.467c0,5.12,3.413,8.533,8.533,8.533h76.8h187.733h76.8c5.12,0,8.533-3.413,8.533-8.533
                  C404.442,422.3,346.01,354.941,267.909,343.026z M336.175,186.733c0,9.099-7.222,16.572-16.213,17.023V169.71
                  C328.954,170.161,336.175,177.635,336.175,186.733z M68.229,114.2c33.28-18.773,64.853-43.52,104.107-79.36
                  c12.8-11.947,32.427-18.773,52.907-18.773c20.48,0,40.107,6.827,52.907,18.773c8.457,7.722,16.557,14.926,24.395,21.669
                  c-5.766,10.801-9.035,23.169-9.035,36.357c0,5.12,3.413,8.533,8.533,8.533s8.533-3.413,8.533-8.533
                  c0-8.977,1.939-17.448,5.403-25.047c23.143,19.032,44.34,34.005,66.277,46.38l6.827,4.267h-81.92H144.175H61.402L68.229,114.2z
                  M114.309,186.733c0-9.387,7.68-17.067,17.067-17.067V203.8C121.989,203.8,114.309,196.12,114.309,186.733z M148.442,220.867
                  v-11.093v-47.787V152.6c0-5.973,0.853-11.093,1.707-17.067h150.187c0.853,5.973,1.707,11.093,1.707,17.067v11.093v47.787v9.387
                  c0,42.667-34.133,76.8-76.8,76.8C182.575,297.667,148.442,263.533,148.442,220.867z M225.242,314.733
                  c7.396,0,14.585-0.846,21.479-2.444c1.388-0.297,2.766-0.613,4.121-0.969v38.4v16.213c0,3.627-0.693,7.04-1.96,10.12
                  c-0.317,0.77-0.669,1.519-1.056,2.246c-1.353,2.543-3.121,4.807-5.225,6.713c-0.601,0.544-1.23,1.06-1.884,1.544
                  c-0.327,0.242-0.66,0.476-1,0.703c-1.358,0.905-2.815,1.682-4.355,2.315c-0.385,0.158-0.775,0.308-1.17,0.448
                  c-1.581,0.561-3.241,0.974-4.966,1.226c-0.431,0.063-0.866,0.116-1.306,0.158c-0.878,0.085-1.771,0.128-2.678,0.128
                  s-1.8-0.043-2.678-0.128c-0.439-0.042-0.874-0.095-1.306-0.158c-3.881-0.566-7.435-1.953-10.491-3.989
                  c-0.34-0.226-0.673-0.461-1-0.703c-0.654-0.484-1.283-0.999-1.884-1.544c-2.104-1.906-3.873-4.17-5.225-6.713
                  c-0.386-0.726-0.739-1.476-1.056-2.246c-1.267-3.08-1.96-6.493-1.96-10.12v-17.067V311.32c1.361,0.358,2.745,0.675,4.139,0.973
                  C210.668,313.888,217.852,314.733,225.242,314.733z M225.242,408.6c23.893,0,42.667-18.773,42.667-42.667v-5.973
                  c5.834,0.972,11.526,2.293,17.067,3.925v61.782H165.509V363.94c5.549-1.658,11.243-2.997,17.067-3.98v5.973
                  C182.575,389.827,201.349,408.6,225.242,408.6z M148.442,370.258v55.409h-17.067c-5.12,0-8.533,3.413-8.533,8.533v59.733H63.109
                  C66.598,438.807,100.333,391.676,148.442,370.258z M139.909,493.933v-51.2h170.667v51.2H139.909z M327.642,493.933V434.2
                  c0-5.12-3.413-8.533-8.533-8.533h-17.067v-55.545c48.537,21.353,81.837,68.568,85.333,123.812H327.642z" />
                      <path d="M481.242,237.933c-5.12,0-8.533,3.413-8.533,8.533v68.267c0,14.218-6.649,26.621-17.067,34.336V255
                  c0-5.12-3.413-8.533-8.533-8.533s-8.533,3.413-8.533,8.533v101.575c-2.751,0.54-5.603,0.825-8.533,0.825
                  s-5.782-0.286-8.533-0.825V255c0-5.12-3.413-8.533-8.533-8.533s-8.533,3.413-8.533,8.533v94.07
                  c-10.418-7.715-17.067-20.118-17.067-34.336v-68.267c0-5.12-3.413-8.533-8.533-8.533s-8.533,3.413-8.533,8.533v68.267
                  c0,30.378,22.045,55.056,51.2,59.131v128.603c0,5.12,3.413,8.533,8.533,8.533s8.533-3.413,8.533-8.533V373.864
                  c29.155-4.075,51.2-28.753,51.2-59.131v-68.267C489.775,241.347,486.362,237.933,481.242,237.933z" />
                      <path d="M276.442,459.8h-102.4c-5.12,0-8.533,3.413-8.533,8.533s3.413,8.533,8.533,8.533h102.4c5.12,0,8.533-3.413,8.533-8.533
                  S281.562,459.8,276.442,459.8z" />
                    </g>
                  </g>
                </g>
              </svg>
              <p>Агроному в поміч</p>
            </a>
          </div>
        </div>
      </div>
    </header>