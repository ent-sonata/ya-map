/* Дополнительные пакеты */
ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
  '@yandex/ymaps3-default-ui-theme@latest'
]);

ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
  '@yandex/ymaps3-clusterer@latest'
]);

ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
  '@yandex/ymaps3-hint@latest'
]);

ymaps3.ready.then(async () => {
  /* Спойлер */
  const container = document.getElementById("map");

  /* Если нужный спойлер найден */
  if (container) {
    /* Основные элементы карты */
    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapControls,
      YMapDefaultFeaturesLayer
    } = ymaps3;

    const {YMapDefaultMarker, YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');

    /* Див для карты в спойлер */
    const mapDiv = document.createElement("div");
    mapDiv.style.width = "100%";
    mapDiv.style.height = "460px";
    container.appendChild(mapDiv);

    /* Настройка карты */
    const map = new YMap(mapDiv, {
        location: {
          center: [-0.106865, 51.524696],
          zoom: 13
        },
        mode: "vector"
      },
      [
        new YMapDefaultSchemeLayer({}),
        new YMapDefaultFeaturesLayer({})
      ]);

    /* Создание маркера */
    function createMarker(marker, title, subtitle, coord_first, coord_second) {
      /* Всплывающее окно */
      function popupPoint() {
        const popup = document.createElement('div');
        popup.classList.add('popup');

        const popupContent = document.createElement('div');
        popupContent.classList.add('popup__content');

        const popupInfo = document.createElement('div');
        popupInfo.classList.add('popup__info');

        const popupText = document.createElement('div');
        popupText.classList.add('popup__info_content');
        popupText.innerHTML = subtitle;
        popupInfo.appendChild(popupText);

        const close = document.createElement('button');
        close.classList.add('close_popup');

        close.onclick = () => {
          marker.update({
            popup: {
              show: false
            }
          });
        };

        popupContent.appendChild(popupInfo);

        popup.appendChild(popupContent);
        popup.appendChild(close);

        return popup;
      }

      let isVisible = false;

      /* Маркер */
      marker = new YMapDefaultMarker({
        coordinates: [coord_first, coord_second],
        title: title,
        subtitle: subtitle,
        color: 'blue',
        popup: {content: popupPoint, position: 'top'},

        /* При клике на маркер */
        onClick: () => {
          if (isVisible === false) {
            isVisible = true;
            marker.update({popup: {show: isVisible}});
          } else if (isVisible === true) {
            isVisible = false;
            marker.update({popup: {show: isVisible}});
          }
        }
      })

      map.addChild(marker);
    }

    /* Вампирский квартал */
    let vampPlace;

    createMarker(vampPlace,
      'Вампирский квартал',
      'Вероятно, вы не узнаете, что он вампирский;<br>Лондон, Сохо',
      -0.123516, 51.519449);

    /* Отдел авроров и хит-визардов */
    let hitPlace;

    createMarker(hitPlace,
      'Отдел авроров и хит-визардов',
      'К хит-визардам могут обратиться любые жители Лондона;<br>Лондон, Сити',
      -0.095974, 51.529312);

    /* Трикл-Майн-Роуд */
    let mindPlace;

    createMarker(mindPlace,
      'Трикл-Майн-Роуд',
      'Молодежная волшебная улица;<br>Лондон, Магический район',
      -0.099335, 51.544177);

    /* Косой переулок */
    let obliquePlace;

    createMarker(obliquePlace,
      'Косой переулок',
      'Главная туристическая волшебная улица;<br>Лондон, Магический район',
      -0.134340, 51.512795);

    /* Каркитт-Маркет */
    let karkittPlace;

    createMarker(karkittPlace,
      'Каркитт-Маркет',
      'Пустующая площадь, на которой происходят странные события;<br>Лондон, Магический район',
      -0.135977, 51.513871);

    /* Лютный переулок */
    let lyutnyPlace;

    createMarker(lyutnyPlace,
      'Лютный переулок',
      'Улица, закрытая от магглов;<br>Лондон, Магический район',
      -0.136173, 51.511600);

    /* Горизонтальный переулок */
    let horizontalPlace;

    createMarker(horizontalPlace,
      'Горизонтальный переулок',
      'Лондон, Магический район',
      -0.137808, 51.512758);

    /* Больница им. Святого Мунго */
    let mungoPlace;

    createMarker(mungoPlace,
      'Больница им. Святого Мунго',
      'Больница;<br>Лондон, Сити-оф-Вестминстер',
      -0.142780, 51.521726);

    /* МАЖАС */
    let mazhasPlace;

    createMarker(mazhasPlace,
      'МАЖАС',
      'Магическая академия живописи, архитектуры и скульптуры;<br>Лондон, Сент Мартинс',
      -0.126728, 51.510503);

    /* вокзал Кингс-Кросс */
    let kingsPlace;

    createMarker(kingsPlace,
      'вокзал Кингс-Кросс',
      'Железнодорожный вокзал;<br>Лондон, лондонский боро Камден',
      -0.123399, 51.530837);

    /* ВАДИ */
    let vadiPlace;

    createMarker(vadiPlace,
      'ВАДИ',
      'Волшебная Академии Драматических Искусств;<br>Лондон, Лондон-Боро-оф-Ламбет',
      -0.113884, 51.507066);


    /* Масштабирование */
    map.addChild(
      new YMapControls({position: 'right'})
        .addChild(new YMapZoomControl({}))
    );

    /* Дизайн */
    map.addChild(new YMapDefaultSchemeLayer({
      customization: [
        {
          "tags": "country",
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#8c8c8c"
            },
            {
              "opacity": 0.8,
              "zoom": 0
            },
            {
              "opacity": 0.8,
              "zoom": 1
            },
            {
              "opacity": 0.8,
              "zoom": 2
            },
            {
              "opacity": 0.8,
              "zoom": 3
            },
            {
              "opacity": 0.8,
              "zoom": 4
            },
            {
              "opacity": 1,
              "zoom": 5
            },
            {
              "opacity": 1,
              "zoom": 6
            },
            {
              "opacity": 1,
              "zoom": 7
            },
            {
              "opacity": 1,
              "zoom": 8
            },
            {
              "opacity": 1,
              "zoom": 9
            },
            {
              "opacity": 1,
              "zoom": 10
            },
            {
              "opacity": 1,
              "zoom": 11
            },
            {
              "opacity": 1,
              "zoom": 12
            },
            {
              "opacity": 1,
              "zoom": 13
            },
            {
              "opacity": 1,
              "zoom": 14
            },
            {
              "opacity": 1,
              "zoom": 15
            },
            {
              "opacity": 1,
              "zoom": 16
            },
            {
              "opacity": 1,
              "zoom": 17
            },
            {
              "opacity": 1,
              "zoom": 18
            },
            {
              "opacity": 1,
              "zoom": 19
            },
            {
              "opacity": 1,
              "zoom": 20
            },
            {
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "country",
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#dedede"
            },
            {
              "opacity": 0.15,
              "zoom": 0
            },
            {
              "opacity": 0.15,
              "zoom": 1
            },
            {
              "opacity": 0.15,
              "zoom": 2
            },
            {
              "opacity": 0.15,
              "zoom": 3
            },
            {
              "opacity": 0.15,
              "zoom": 4
            },
            {
              "opacity": 0.15,
              "zoom": 5
            },
            {
              "opacity": 0.25,
              "zoom": 6
            },
            {
              "opacity": 0.5,
              "zoom": 7
            },
            {
              "opacity": 0.47,
              "zoom": 8
            },
            {
              "opacity": 0.44,
              "zoom": 9
            },
            {
              "opacity": 0.41,
              "zoom": 10
            },
            {
              "opacity": 0.38,
              "zoom": 11
            },
            {
              "opacity": 0.35,
              "zoom": 12
            },
            {
              "opacity": 0.33,
              "zoom": 13
            },
            {
              "opacity": 0.3,
              "zoom": 14
            },
            {
              "opacity": 0.28,
              "zoom": 15
            },
            {
              "opacity": 0.25,
              "zoom": 16
            },
            {
              "opacity": 0.25,
              "zoom": 17
            },
            {
              "opacity": 0.25,
              "zoom": 18
            },
            {
              "opacity": 0.25,
              "zoom": 19
            },
            {
              "opacity": 0.25,
              "zoom": 20
            },
            {
              "opacity": 0.25,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "region",
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#a6a6a6",
              "opacity": 0.5,
              "zoom": 0
            },
            {
              "color": "#a6a6a6",
              "opacity": 0.5,
              "zoom": 1
            },
            {
              "color": "#a6a6a6",
              "opacity": 0.5,
              "zoom": 2
            },
            {
              "color": "#a6a6a6",
              "opacity": 0.5,
              "zoom": 3
            },
            {
              "color": "#a6a6a6",
              "opacity": 0.5,
              "zoom": 4
            },
            {
              "color": "#a6a6a6",
              "opacity": 0.5,
              "zoom": 5
            },
            {
              "color": "#a6a6a6",
              "opacity": 1,
              "zoom": 6
            },
            {
              "color": "#a6a6a6",
              "opacity": 1,
              "zoom": 7
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 8
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 9
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 10
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 11
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 12
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 13
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 14
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 15
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 16
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 17
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 18
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 19
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 20
            },
            {
              "color": "#8c8c8c",
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "region",
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#dedede"
            },
            {
              "opacity": 0.15,
              "zoom": 0
            },
            {
              "opacity": 0.15,
              "zoom": 1
            },
            {
              "opacity": 0.15,
              "zoom": 2
            },
            {
              "opacity": 0.15,
              "zoom": 3
            },
            {
              "opacity": 0.15,
              "zoom": 4
            },
            {
              "opacity": 0.15,
              "zoom": 5
            },
            {
              "opacity": 0.25,
              "zoom": 6
            },
            {
              "opacity": 0.5,
              "zoom": 7
            },
            {
              "opacity": 0.47,
              "zoom": 8
            },
            {
              "opacity": 0.44,
              "zoom": 9
            },
            {
              "opacity": 0.41,
              "zoom": 10
            },
            {
              "opacity": 0.38,
              "zoom": 11
            },
            {
              "opacity": 0.35,
              "zoom": 12
            },
            {
              "opacity": 0.33,
              "zoom": 13
            },
            {
              "opacity": 0.3,
              "zoom": 14
            },
            {
              "opacity": 0.28,
              "zoom": 15
            },
            {
              "opacity": 0.25,
              "zoom": 16
            },
            {
              "opacity": 0.25,
              "zoom": 17
            },
            {
              "opacity": 0.25,
              "zoom": 18
            },
            {
              "opacity": 0.25,
              "zoom": 19
            },
            {
              "opacity": 0.25,
              "zoom": 20
            },
            {
              "opacity": 0.25,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "admin",
            "none": [
              "country",
              "region",
              "locality",
              "district",
              "address"
            ]
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#8c8c8c"
            },
            {
              "opacity": 0.5,
              "zoom": 0
            },
            {
              "opacity": 0.5,
              "zoom": 1
            },
            {
              "opacity": 0.5,
              "zoom": 2
            },
            {
              "opacity": 0.5,
              "zoom": 3
            },
            {
              "opacity": 0.5,
              "zoom": 4
            },
            {
              "opacity": 0.5,
              "zoom": 5
            },
            {
              "opacity": 1,
              "zoom": 6
            },
            {
              "opacity": 1,
              "zoom": 7
            },
            {
              "opacity": 1,
              "zoom": 8
            },
            {
              "opacity": 1,
              "zoom": 9
            },
            {
              "opacity": 1,
              "zoom": 10
            },
            {
              "opacity": 1,
              "zoom": 11
            },
            {
              "opacity": 1,
              "zoom": 12
            },
            {
              "opacity": 1,
              "zoom": 13
            },
            {
              "opacity": 1,
              "zoom": 14
            },
            {
              "opacity": 1,
              "zoom": 15
            },
            {
              "opacity": 1,
              "zoom": 16
            },
            {
              "opacity": 1,
              "zoom": 17
            },
            {
              "opacity": 1,
              "zoom": 18
            },
            {
              "opacity": 1,
              "zoom": 19
            },
            {
              "opacity": 1,
              "zoom": 20
            },
            {
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "admin",
            "none": [
              "country",
              "region",
              "locality",
              "district",
              "address"
            ]
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#dedede"
            },
            {
              "opacity": 0.15,
              "zoom": 0
            },
            {
              "opacity": 0.15,
              "zoom": 1
            },
            {
              "opacity": 0.15,
              "zoom": 2
            },
            {
              "opacity": 0.15,
              "zoom": 3
            },
            {
              "opacity": 0.15,
              "zoom": 4
            },
            {
              "opacity": 0.15,
              "zoom": 5
            },
            {
              "opacity": 0.25,
              "zoom": 6
            },
            {
              "opacity": 0.5,
              "zoom": 7
            },
            {
              "opacity": 0.47,
              "zoom": 8
            },
            {
              "opacity": 0.44,
              "zoom": 9
            },
            {
              "opacity": 0.41,
              "zoom": 10
            },
            {
              "opacity": 0.38,
              "zoom": 11
            },
            {
              "opacity": 0.35,
              "zoom": 12
            },
            {
              "opacity": 0.33,
              "zoom": 13
            },
            {
              "opacity": 0.3,
              "zoom": 14
            },
            {
              "opacity": 0.28,
              "zoom": 15
            },
            {
              "opacity": 0.25,
              "zoom": 16
            },
            {
              "opacity": 0.25,
              "zoom": 17
            },
            {
              "opacity": 0.25,
              "zoom": 18
            },
            {
              "opacity": 0.25,
              "zoom": 19
            },
            {
              "opacity": 0.25,
              "zoom": 20
            },
            {
              "opacity": 0.25,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "landcover",
            "none": "vegetation"
          },
          "stylers": [
            {
              "hue": "#c7cfd6"
            }
          ]
        },
        {
          "tags": "vegetation",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#aab6c0",
              "opacity": 0.1,
              "zoom": 0
            },
            {
              "color": "#aab6c0",
              "opacity": 0.1,
              "zoom": 1
            },
            {
              "color": "#aab6c0",
              "opacity": 0.1,
              "zoom": 2
            },
            {
              "color": "#aab6c0",
              "opacity": 0.1,
              "zoom": 3
            },
            {
              "color": "#aab6c0",
              "opacity": 0.1,
              "zoom": 4
            },
            {
              "color": "#aab6c0",
              "opacity": 0.1,
              "zoom": 5
            },
            {
              "color": "#aab6c0",
              "opacity": 0.2,
              "zoom": 6
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.3,
              "zoom": 7
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.4,
              "zoom": 8
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.6,
              "zoom": 9
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.8,
              "zoom": 10
            },
            {
              "color": "#c7cfd6",
              "opacity": 1,
              "zoom": 11
            },
            {
              "color": "#c7cfd6",
              "opacity": 1,
              "zoom": 12
            },
            {
              "color": "#c7cfd6",
              "opacity": 1,
              "zoom": 13
            },
            {
              "color": "#cdd4da",
              "opacity": 1,
              "zoom": 14
            },
            {
              "color": "#d3d9df",
              "opacity": 1,
              "zoom": 15
            },
            {
              "color": "#d3d9df",
              "opacity": 1,
              "zoom": 16
            },
            {
              "color": "#d3d9df",
              "opacity": 1,
              "zoom": 17
            },
            {
              "color": "#d3d9df",
              "opacity": 1,
              "zoom": 18
            },
            {
              "color": "#d3d9df",
              "opacity": 1,
              "zoom": 19
            },
            {
              "color": "#d3d9df",
              "opacity": 1,
              "zoom": 20
            },
            {
              "color": "#d3d9df",
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "park",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 0
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 1
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 2
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 3
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 4
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 5
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.2,
              "zoom": 6
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.3,
              "zoom": 7
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.4,
              "zoom": 8
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.6,
              "zoom": 9
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.8,
              "zoom": 10
            },
            {
              "color": "#c7cfd6",
              "opacity": 1,
              "zoom": 11
            },
            {
              "color": "#c7cfd6",
              "opacity": 1,
              "zoom": 12
            },
            {
              "color": "#c7cfd6",
              "opacity": 1,
              "zoom": 13
            },
            {
              "color": "#cdd4da",
              "opacity": 1,
              "zoom": 14
            },
            {
              "color": "#d3d9df",
              "opacity": 1,
              "zoom": 15
            },
            {
              "color": "#d3d9df",
              "opacity": 0.9,
              "zoom": 16
            },
            {
              "color": "#d3d9df",
              "opacity": 0.8,
              "zoom": 17
            },
            {
              "color": "#d3d9df",
              "opacity": 0.7,
              "zoom": 18
            },
            {
              "color": "#d3d9df",
              "opacity": 0.7,
              "zoom": 19
            },
            {
              "color": "#d3d9df",
              "opacity": 0.7,
              "zoom": 20
            },
            {
              "color": "#d3d9df",
              "opacity": 0.7,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "national_park",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 0
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 1
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 2
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 3
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 4
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.1,
              "zoom": 5
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.2,
              "zoom": 6
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.3,
              "zoom": 7
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.4,
              "zoom": 8
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.6,
              "zoom": 9
            },
            {
              "color": "#c7cfd6",
              "opacity": 0.8,
              "zoom": 10
            },
            {
              "color": "#c7cfd6",
              "opacity": 1,
              "zoom": 11
            },
            {
              "color": "#c7cfd6",
              "opacity": 1,
              "zoom": 12
            },
            {
              "color": "#c7cfd6",
              "opacity": 1,
              "zoom": 13
            },
            {
              "color": "#cdd4da",
              "opacity": 1,
              "zoom": 14
            },
            {
              "color": "#d3d9df",
              "opacity": 1,
              "zoom": 15
            },
            {
              "color": "#d3d9df",
              "opacity": 0.7,
              "zoom": 16
            },
            {
              "color": "#d3d9df",
              "opacity": 0.7,
              "zoom": 17
            },
            {
              "color": "#d3d9df",
              "opacity": 0.7,
              "zoom": 18
            },
            {
              "color": "#d3d9df",
              "opacity": 0.7,
              "zoom": 19
            },
            {
              "color": "#d3d9df",
              "opacity": 0.7,
              "zoom": 20
            },
            {
              "color": "#d3d9df",
              "opacity": 0.7,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "cemetery",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#c7cfd6",
              "zoom": 0
            },
            {
              "color": "#c7cfd6",
              "zoom": 1
            },
            {
              "color": "#c7cfd6",
              "zoom": 2
            },
            {
              "color": "#c7cfd6",
              "zoom": 3
            },
            {
              "color": "#c7cfd6",
              "zoom": 4
            },
            {
              "color": "#c7cfd6",
              "zoom": 5
            },
            {
              "color": "#c7cfd6",
              "zoom": 6
            },
            {
              "color": "#c7cfd6",
              "zoom": 7
            },
            {
              "color": "#c7cfd6",
              "zoom": 8
            },
            {
              "color": "#c7cfd6",
              "zoom": 9
            },
            {
              "color": "#c7cfd6",
              "zoom": 10
            },
            {
              "color": "#c7cfd6",
              "zoom": 11
            },
            {
              "color": "#c7cfd6",
              "zoom": 12
            },
            {
              "color": "#c7cfd6",
              "zoom": 13
            },
            {
              "color": "#cdd4da",
              "zoom": 14
            },
            {
              "color": "#d3d9df",
              "zoom": 15
            },
            {
              "color": "#d3d9df",
              "zoom": 16
            },
            {
              "color": "#d3d9df",
              "zoom": 17
            },
            {
              "color": "#d3d9df",
              "zoom": 18
            },
            {
              "color": "#d3d9df",
              "zoom": 19
            },
            {
              "color": "#d3d9df",
              "zoom": 20
            },
            {
              "color": "#d3d9df",
              "zoom": 21
            }
          ]
        },
        {
          "tags": "sports_ground",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 0
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 1
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 2
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 3
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 4
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 5
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 6
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 7
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 8
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 9
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 10
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 11
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 12
            },
            {
              "color": "#b8c2cb",
              "opacity": 0,
              "zoom": 13
            },
            {
              "color": "#bec7cf",
              "opacity": 0,
              "zoom": 14
            },
            {
              "color": "#c4ccd4",
              "opacity": 0.5,
              "zoom": 15
            },
            {
              "color": "#c5cdd5",
              "opacity": 1,
              "zoom": 16
            },
            {
              "color": "#c6ced5",
              "opacity": 1,
              "zoom": 17
            },
            {
              "color": "#c7ced6",
              "opacity": 1,
              "zoom": 18
            },
            {
              "color": "#c8cfd7",
              "opacity": 1,
              "zoom": 19
            },
            {
              "color": "#c9d0d7",
              "opacity": 1,
              "zoom": 20
            },
            {
              "color": "#cad1d8",
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "terrain",
          "elements": "geometry",
          "stylers": [
            {
              "hue": "#e1e3e5"
            },
            {
              "opacity": 0.3,
              "zoom": 0
            },
            {
              "opacity": 0.3,
              "zoom": 1
            },
            {
              "opacity": 0.3,
              "zoom": 2
            },
            {
              "opacity": 0.3,
              "zoom": 3
            },
            {
              "opacity": 0.3,
              "zoom": 4
            },
            {
              "opacity": 0.35,
              "zoom": 5
            },
            {
              "opacity": 0.4,
              "zoom": 6
            },
            {
              "opacity": 0.6,
              "zoom": 7
            },
            {
              "opacity": 0.8,
              "zoom": 8
            },
            {
              "opacity": 0.9,
              "zoom": 9
            },
            {
              "opacity": 1,
              "zoom": 10
            },
            {
              "opacity": 1,
              "zoom": 11
            },
            {
              "opacity": 1,
              "zoom": 12
            },
            {
              "opacity": 1,
              "zoom": 13
            },
            {
              "opacity": 1,
              "zoom": 14
            },
            {
              "opacity": 1,
              "zoom": 15
            },
            {
              "opacity": 1,
              "zoom": 16
            },
            {
              "opacity": 1,
              "zoom": 17
            },
            {
              "opacity": 1,
              "zoom": 18
            },
            {
              "opacity": 1,
              "zoom": 19
            },
            {
              "opacity": 1,
              "zoom": 20
            },
            {
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "geographic_line",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#747d86"
            }
          ]
        },
        {
          "tags": "land",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#e1e3e4",
              "zoom": 0
            },
            {
              "color": "#e1e3e4",
              "zoom": 1
            },
            {
              "color": "#e1e3e4",
              "zoom": 2
            },
            {
              "color": "#e1e3e4",
              "zoom": 3
            },
            {
              "color": "#e1e3e4",
              "zoom": 4
            },
            {
              "color": "#e4e5e6",
              "zoom": 5
            },
            {
              "color": "#e6e8e9",
              "zoom": 6
            },
            {
              "color": "#e9eaeb",
              "zoom": 7
            },
            {
              "color": "#ecedee",
              "zoom": 8
            },
            {
              "color": "#ecedee",
              "zoom": 9
            },
            {
              "color": "#ecedee",
              "zoom": 10
            },
            {
              "color": "#ecedee",
              "zoom": 11
            },
            {
              "color": "#ecedee",
              "zoom": 12
            },
            {
              "color": "#ecedee",
              "zoom": 13
            },
            {
              "color": "#eeeff0",
              "zoom": 14
            },
            {
              "color": "#f1f2f3",
              "zoom": 15
            },
            {
              "color": "#f1f2f3",
              "zoom": 16
            },
            {
              "color": "#f2f3f4",
              "zoom": 17
            },
            {
              "color": "#f2f3f4",
              "zoom": 18
            },
            {
              "color": "#f3f4f4",
              "zoom": 19
            },
            {
              "color": "#f3f4f5",
              "zoom": 20
            },
            {
              "color": "#f4f5f5",
              "zoom": 21
            }
          ]
        },
        {
          "tags": "residential",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 0
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 1
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 2
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 3
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 4
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 5
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 6
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 7
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 8
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 9
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 10
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 11
            },
            {
              "color": "#e1e3e5",
              "opacity": 0.5,
              "zoom": 12
            },
            {
              "color": "#e1e3e5",
              "opacity": 1,
              "zoom": 13
            },
            {
              "color": "#e6e8e9",
              "opacity": 1,
              "zoom": 14
            },
            {
              "color": "#ecedee",
              "opacity": 1,
              "zoom": 15
            },
            {
              "color": "#edeeef",
              "opacity": 1,
              "zoom": 16
            },
            {
              "color": "#eeeff0",
              "opacity": 1,
              "zoom": 17
            },
            {
              "color": "#eeeff0",
              "opacity": 1,
              "zoom": 18
            },
            {
              "color": "#eff0f1",
              "opacity": 1,
              "zoom": 19
            },
            {
              "color": "#f0f1f2",
              "opacity": 1,
              "zoom": 20
            },
            {
              "color": "#f1f2f3",
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "locality",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#e1e3e5",
              "zoom": 0
            },
            {
              "color": "#e1e3e5",
              "zoom": 1
            },
            {
              "color": "#e1e3e5",
              "zoom": 2
            },
            {
              "color": "#e1e3e5",
              "zoom": 3
            },
            {
              "color": "#e1e3e5",
              "zoom": 4
            },
            {
              "color": "#e1e3e5",
              "zoom": 5
            },
            {
              "color": "#e1e3e5",
              "zoom": 6
            },
            {
              "color": "#e1e3e5",
              "zoom": 7
            },
            {
              "color": "#e1e3e5",
              "zoom": 8
            },
            {
              "color": "#e1e3e5",
              "zoom": 9
            },
            {
              "color": "#e1e3e5",
              "zoom": 10
            },
            {
              "color": "#e1e3e5",
              "zoom": 11
            },
            {
              "color": "#e1e3e5",
              "zoom": 12
            },
            {
              "color": "#e1e3e5",
              "zoom": 13
            },
            {
              "color": "#e6e8e9",
              "zoom": 14
            },
            {
              "color": "#ecedee",
              "zoom": 15
            },
            {
              "color": "#edeeef",
              "zoom": 16
            },
            {
              "color": "#eeeff0",
              "zoom": 17
            },
            {
              "color": "#eeeff0",
              "zoom": 18
            },
            {
              "color": "#eff0f1",
              "zoom": 19
            },
            {
              "color": "#f0f1f2",
              "zoom": 20
            },
            {
              "color": "#f1f2f3",
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "structure",
            "none": [
              "building",
              "fence"
            ]
          },
          "elements": "geometry",
          "stylers": [
            {
              "opacity": 0.9
            },
            {
              "color": "#e1e3e5",
              "zoom": 0
            },
            {
              "color": "#e1e3e5",
              "zoom": 1
            },
            {
              "color": "#e1e3e5",
              "zoom": 2
            },
            {
              "color": "#e1e3e5",
              "zoom": 3
            },
            {
              "color": "#e1e3e5",
              "zoom": 4
            },
            {
              "color": "#e1e3e5",
              "zoom": 5
            },
            {
              "color": "#e1e3e5",
              "zoom": 6
            },
            {
              "color": "#e1e3e5",
              "zoom": 7
            },
            {
              "color": "#e1e3e5",
              "zoom": 8
            },
            {
              "color": "#e1e3e5",
              "zoom": 9
            },
            {
              "color": "#e1e3e5",
              "zoom": 10
            },
            {
              "color": "#e1e3e5",
              "zoom": 11
            },
            {
              "color": "#e1e3e5",
              "zoom": 12
            },
            {
              "color": "#e1e3e5",
              "zoom": 13
            },
            {
              "color": "#e6e8e9",
              "zoom": 14
            },
            {
              "color": "#ecedee",
              "zoom": 15
            },
            {
              "color": "#edeeef",
              "zoom": 16
            },
            {
              "color": "#eeeff0",
              "zoom": 17
            },
            {
              "color": "#eeeff0",
              "zoom": 18
            },
            {
              "color": "#eff0f1",
              "zoom": 19
            },
            {
              "color": "#f0f1f2",
              "zoom": 20
            },
            {
              "color": "#f1f2f3",
              "zoom": 21
            }
          ]
        },
        {
          "tags": "building",
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#dee0e3"
            },
            {
              "opacity": 0.7,
              "zoom": 0
            },
            {
              "opacity": 0.7,
              "zoom": 1
            },
            {
              "opacity": 0.7,
              "zoom": 2
            },
            {
              "opacity": 0.7,
              "zoom": 3
            },
            {
              "opacity": 0.7,
              "zoom": 4
            },
            {
              "opacity": 0.7,
              "zoom": 5
            },
            {
              "opacity": 0.7,
              "zoom": 6
            },
            {
              "opacity": 0.7,
              "zoom": 7
            },
            {
              "opacity": 0.7,
              "zoom": 8
            },
            {
              "opacity": 0.7,
              "zoom": 9
            },
            {
              "opacity": 0.7,
              "zoom": 10
            },
            {
              "opacity": 0.7,
              "zoom": 11
            },
            {
              "opacity": 0.7,
              "zoom": 12
            },
            {
              "opacity": 0.7,
              "zoom": 13
            },
            {
              "opacity": 0.7,
              "zoom": 14
            },
            {
              "opacity": 0.7,
              "zoom": 15
            },
            {
              "opacity": 0.9,
              "zoom": 16
            },
            {
              "opacity": 0.6,
              "zoom": 17
            },
            {
              "opacity": 0.6,
              "zoom": 18
            },
            {
              "opacity": 0.6,
              "zoom": 19
            },
            {
              "opacity": 0.6,
              "zoom": 20
            },
            {
              "opacity": 0.6,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "building",
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#c8ccd1"
            },
            {
              "opacity": 0.5,
              "zoom": 0
            },
            {
              "opacity": 0.5,
              "zoom": 1
            },
            {
              "opacity": 0.5,
              "zoom": 2
            },
            {
              "opacity": 0.5,
              "zoom": 3
            },
            {
              "opacity": 0.5,
              "zoom": 4
            },
            {
              "opacity": 0.5,
              "zoom": 5
            },
            {
              "opacity": 0.5,
              "zoom": 6
            },
            {
              "opacity": 0.5,
              "zoom": 7
            },
            {
              "opacity": 0.5,
              "zoom": 8
            },
            {
              "opacity": 0.5,
              "zoom": 9
            },
            {
              "opacity": 0.5,
              "zoom": 10
            },
            {
              "opacity": 0.5,
              "zoom": 11
            },
            {
              "opacity": 0.5,
              "zoom": 12
            },
            {
              "opacity": 0.5,
              "zoom": 13
            },
            {
              "opacity": 0.5,
              "zoom": 14
            },
            {
              "opacity": 0.5,
              "zoom": 15
            },
            {
              "opacity": 0.5,
              "zoom": 16
            },
            {
              "opacity": 1,
              "zoom": 17
            },
            {
              "opacity": 1,
              "zoom": 18
            },
            {
              "opacity": 1,
              "zoom": 19
            },
            {
              "opacity": 1,
              "zoom": 20
            },
            {
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "urban_area",
            "none": [
              "residential",
              "industrial",
              "cemetery",
              "park",
              "medical",
              "sports_ground",
              "beach",
              "construction_site"
            ]
          },
          "elements": "geometry",
          "stylers": [
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 0
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 1
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 2
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 3
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 4
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 5
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 6
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 7
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 8
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 9
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 10
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 11
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 12
            },
            {
              "color": "#d6d9dc",
              "opacity": 1,
              "zoom": 13
            },
            {
              "color": "#dddfe2",
              "opacity": 1,
              "zoom": 14
            },
            {
              "color": "#e4e6e8",
              "opacity": 1,
              "zoom": 15
            },
            {
              "color": "#ebeced",
              "opacity": 0.67,
              "zoom": 16
            },
            {
              "color": "#f2f3f3",
              "opacity": 0.33,
              "zoom": 17
            },
            {
              "color": "#f2f3f3",
              "opacity": 0,
              "zoom": 18
            },
            {
              "color": "#f2f3f3",
              "opacity": 0,
              "zoom": 19
            },
            {
              "color": "#f2f3f3",
              "opacity": 0,
              "zoom": 20
            },
            {
              "color": "#f2f3f3",
              "opacity": 0,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "poi",
          "elements": "label.icon",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            },
            {
              "tertiary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "poi",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#778088"
            }
          ]
        },
        {
          "tags": "poi",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "outdoor",
          "elements": "label.icon",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            },
            {
              "tertiary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "outdoor",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#778088"
            }
          ]
        },
        {
          "tags": "outdoor",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "park",
          "elements": "label.icon",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            },
            {
              "tertiary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "park",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#778088"
            }
          ]
        },
        {
          "tags": "park",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "cemetery",
          "elements": "label.icon",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            },
            {
              "tertiary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "cemetery",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#778088"
            }
          ]
        },
        {
          "tags": "cemetery",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "beach",
          "elements": "label.icon",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            },
            {
              "tertiary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "beach",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#778088"
            }
          ]
        },
        {
          "tags": "beach",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "medical",
          "elements": "label.icon",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            },
            {
              "tertiary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "medical",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#778088"
            }
          ]
        },
        {
          "tags": "medical",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "shopping",
          "elements": "label.icon",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            },
            {
              "tertiary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "shopping",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#778088"
            }
          ]
        },
        {
          "tags": "shopping",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "commercial_services",
          "elements": "label.icon",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            },
            {
              "tertiary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "commercial_services",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#778088"
            }
          ]
        },
        {
          "tags": "commercial_services",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "food_and_drink",
          "elements": "label.icon",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            },
            {
              "tertiary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "food_and_drink",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#778088"
            }
          ]
        },
        {
          "tags": "food_and_drink",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "road",
          "elements": "label.icon",
          "types": "point",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            },
            {
              "tertiary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "road",
          "elements": "label.text.fill",
          "types": "point",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "tags": "entrance",
          "elements": "label.icon",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "locality",
          "elements": "label.icon",
          "stylers": [
            {
              "color": "#9da6af"
            },
            {
              "secondary-color": "#ffffff"
            }
          ]
        },
        {
          "tags": "country",
          "elements": "label.text.fill",
          "stylers": [
            {
              "opacity": 0.8
            },
            {
              "color": "#8f969e"
            }
          ]
        },
        {
          "tags": "country",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "region",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#8f969e"
            },
            {
              "opacity": 0.8
            }
          ]
        },
        {
          "tags": "region",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "district",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#8f969e"
            },
            {
              "opacity": 0.8
            }
          ]
        },
        {
          "tags": "district",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": {
            "any": "admin",
            "none": [
              "country",
              "region",
              "locality",
              "district",
              "address"
            ]
          },
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#8f969e"
            }
          ]
        },
        {
          "tags": {
            "any": "admin",
            "none": [
              "country",
              "region",
              "locality",
              "district",
              "address"
            ]
          },
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "locality",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#778088",
              "zoom": 0
            },
            {
              "color": "#778088",
              "zoom": 1
            },
            {
              "color": "#778088",
              "zoom": 2
            },
            {
              "color": "#778088",
              "zoom": 3
            },
            {
              "color": "#778088",
              "zoom": 4
            },
            {
              "color": "#757e86",
              "zoom": 5
            },
            {
              "color": "#737c83",
              "zoom": 6
            },
            {
              "color": "#717a81",
              "zoom": 7
            },
            {
              "color": "#6f777f",
              "zoom": 8
            },
            {
              "color": "#6d757c",
              "zoom": 9
            },
            {
              "color": "#6b737a",
              "zoom": 10
            },
            {
              "color": "#6b737a",
              "zoom": 11
            },
            {
              "color": "#6b737a",
              "zoom": 12
            },
            {
              "color": "#6b737a",
              "zoom": 13
            },
            {
              "color": "#6b737a",
              "zoom": 14
            },
            {
              "color": "#6b737a",
              "zoom": 15
            },
            {
              "color": "#6b737a",
              "zoom": 16
            },
            {
              "color": "#6b737a",
              "zoom": 17
            },
            {
              "color": "#6b737a",
              "zoom": 18
            },
            {
              "color": "#6b737a",
              "zoom": 19
            },
            {
              "color": "#6b737a",
              "zoom": 20
            },
            {
              "color": "#6b737a",
              "zoom": 21
            }
          ]
        },
        {
          "tags": "locality",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "road",
          "elements": "label.text.fill",
          "types": "polyline",
          "stylers": [
            {
              "color": "#778088"
            }
          ]
        },
        {
          "tags": "road",
          "elements": "label.text.outline",
          "types": "polyline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "road",
          "elements": "geometry.fill.pattern",
          "types": "polyline",
          "stylers": [
            {
              "scale": 1
            },
            {
              "color": "#adb3b8"
            }
          ]
        },
        {
          "tags": "road",
          "elements": "label.text.fill",
          "types": "point",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "tags": "structure",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#5f666d"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "structure",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "entrance",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#5f666d"
            },
            {
              "opacity": 1
            }
          ]
        },
        {
          "tags": "entrance",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "address",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#5f666d"
            },
            {
              "opacity": 0.9,
              "zoom": 0
            },
            {
              "opacity": 0.9,
              "zoom": 1
            },
            {
              "opacity": 0.9,
              "zoom": 2
            },
            {
              "opacity": 0.9,
              "zoom": 3
            },
            {
              "opacity": 0.9,
              "zoom": 4
            },
            {
              "opacity": 0.9,
              "zoom": 5
            },
            {
              "opacity": 0.9,
              "zoom": 6
            },
            {
              "opacity": 0.9,
              "zoom": 7
            },
            {
              "opacity": 0.9,
              "zoom": 8
            },
            {
              "opacity": 0.9,
              "zoom": 9
            },
            {
              "opacity": 0.9,
              "zoom": 10
            },
            {
              "opacity": 0.9,
              "zoom": 11
            },
            {
              "opacity": 0.9,
              "zoom": 12
            },
            {
              "opacity": 0.9,
              "zoom": 13
            },
            {
              "opacity": 0.9,
              "zoom": 14
            },
            {
              "opacity": 0.9,
              "zoom": 15
            },
            {
              "opacity": 0.9,
              "zoom": 16
            },
            {
              "opacity": 1,
              "zoom": 17
            },
            {
              "opacity": 1,
              "zoom": 18
            },
            {
              "opacity": 1,
              "zoom": 19
            },
            {
              "opacity": 1,
              "zoom": 20
            },
            {
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "address",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5
            }
          ]
        },
        {
          "tags": "landscape",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#8f969e",
              "opacity": 1,
              "zoom": 0
            },
            {
              "color": "#8f969e",
              "opacity": 1,
              "zoom": 1
            },
            {
              "color": "#8f969e",
              "opacity": 1,
              "zoom": 2
            },
            {
              "color": "#8f969e",
              "opacity": 1,
              "zoom": 3
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 4
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 5
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 6
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 7
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 8
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 9
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 10
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 11
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 12
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 13
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 14
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 15
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 16
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 17
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 18
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 19
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 20
            },
            {
              "color": "#5f666d",
              "opacity": 0.5,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "landscape",
          "elements": "label.text.outline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.5,
              "zoom": 0
            },
            {
              "opacity": 0.5,
              "zoom": 1
            },
            {
              "opacity": 0.5,
              "zoom": 2
            },
            {
              "opacity": 0.5,
              "zoom": 3
            },
            {
              "opacity": 0,
              "zoom": 4
            },
            {
              "opacity": 0,
              "zoom": 5
            },
            {
              "opacity": 0,
              "zoom": 6
            },
            {
              "opacity": 0,
              "zoom": 7
            },
            {
              "opacity": 0,
              "zoom": 8
            },
            {
              "opacity": 0,
              "zoom": 9
            },
            {
              "opacity": 0,
              "zoom": 10
            },
            {
              "opacity": 0,
              "zoom": 11
            },
            {
              "opacity": 0,
              "zoom": 12
            },
            {
              "opacity": 0,
              "zoom": 13
            },
            {
              "opacity": 0,
              "zoom": 14
            },
            {
              "opacity": 0,
              "zoom": 15
            },
            {
              "opacity": 0,
              "zoom": 16
            },
            {
              "opacity": 0,
              "zoom": 17
            },
            {
              "opacity": 0,
              "zoom": 18
            },
            {
              "opacity": 0,
              "zoom": 19
            },
            {
              "opacity": 0,
              "zoom": 20
            },
            {
              "opacity": 0,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "water",
          "elements": "label.text.fill",
          "stylers": [
            {
              "color": "#5e6871"
            },
            {
              "opacity": 0.8
            }
          ]
        },
        {
          "tags": "water",
          "elements": "label.text.outline",
          "types": "polyline",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "opacity": 0.2
            }
          ]
        },
        {
          "tags": {
            "any": "road_1",
            "none": "is_tunnel"
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "scale": 0,
              "zoom": 0
            },
            {
              "scale": 0,
              "zoom": 1
            },
            {
              "scale": 0,
              "zoom": 2
            },
            {
              "scale": 0,
              "zoom": 3
            },
            {
              "scale": 0,
              "zoom": 4
            },
            {
              "scale": 0,
              "zoom": 5
            },
            {
              "scale": 3.3,
              "zoom": 6
            },
            {
              "scale": 3.55,
              "zoom": 7
            },
            {
              "scale": 3.92,
              "zoom": 8
            },
            {
              "scale": 4.44,
              "zoom": 9
            },
            {
              "scale": 4.01,
              "zoom": 10
            },
            {
              "scale": 3.39,
              "zoom": 11
            },
            {
              "scale": 2.94,
              "zoom": 12
            },
            {
              "scale": 2.53,
              "zoom": 13
            },
            {
              "scale": 2.26,
              "zoom": 14
            },
            {
              "scale": 2.11,
              "zoom": 15
            },
            {
              "scale": 2.07,
              "zoom": 16
            },
            {
              "scale": 1.64,
              "zoom": 17
            },
            {
              "scale": 1.35,
              "zoom": 18
            },
            {
              "scale": 1.16,
              "zoom": 19
            },
            {
              "scale": 1.05,
              "zoom": 20
            },
            {
              "scale": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_1"
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#c8ccd0"
            },
            {
              "scale": 1,
              "zoom": 0
            },
            {
              "scale": 1,
              "zoom": 1
            },
            {
              "scale": 1,
              "zoom": 2
            },
            {
              "scale": 1,
              "zoom": 3
            },
            {
              "scale": 1,
              "zoom": 4
            },
            {
              "scale": 1,
              "zoom": 5
            },
            {
              "scale": 2.18,
              "zoom": 6
            },
            {
              "scale": 2.18,
              "zoom": 7
            },
            {
              "scale": 2.25,
              "zoom": 8
            },
            {
              "scale": 2.4,
              "zoom": 9
            },
            {
              "scale": 2.4,
              "zoom": 10
            },
            {
              "scale": 2.26,
              "zoom": 11
            },
            {
              "scale": 2.15,
              "zoom": 12
            },
            {
              "scale": 2,
              "zoom": 13
            },
            {
              "scale": 1.9,
              "zoom": 14
            },
            {
              "scale": 1.86,
              "zoom": 15
            },
            {
              "scale": 1.88,
              "zoom": 16
            },
            {
              "scale": 1.53,
              "zoom": 17
            },
            {
              "scale": 1.28,
              "zoom": 18
            },
            {
              "scale": 1.11,
              "zoom": 19
            },
            {
              "scale": 1.01,
              "zoom": 20
            },
            {
              "scale": 0.96,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_2",
            "none": "is_tunnel"
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "scale": 0,
              "zoom": 0
            },
            {
              "scale": 0,
              "zoom": 1
            },
            {
              "scale": 0,
              "zoom": 2
            },
            {
              "scale": 0,
              "zoom": 3
            },
            {
              "scale": 0,
              "zoom": 4
            },
            {
              "scale": 0,
              "zoom": 5
            },
            {
              "scale": 3.3,
              "zoom": 6
            },
            {
              "scale": 3.55,
              "zoom": 7
            },
            {
              "scale": 3.92,
              "zoom": 8
            },
            {
              "scale": 4.44,
              "zoom": 9
            },
            {
              "scale": 4.01,
              "zoom": 10
            },
            {
              "scale": 3.39,
              "zoom": 11
            },
            {
              "scale": 2.94,
              "zoom": 12
            },
            {
              "scale": 2.53,
              "zoom": 13
            },
            {
              "scale": 2.26,
              "zoom": 14
            },
            {
              "scale": 2.11,
              "zoom": 15
            },
            {
              "scale": 2.07,
              "zoom": 16
            },
            {
              "scale": 1.64,
              "zoom": 17
            },
            {
              "scale": 1.35,
              "zoom": 18
            },
            {
              "scale": 1.16,
              "zoom": 19
            },
            {
              "scale": 1.05,
              "zoom": 20
            },
            {
              "scale": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_2"
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#c8ccd0"
            },
            {
              "scale": 1,
              "zoom": 0
            },
            {
              "scale": 1,
              "zoom": 1
            },
            {
              "scale": 1,
              "zoom": 2
            },
            {
              "scale": 1,
              "zoom": 3
            },
            {
              "scale": 1,
              "zoom": 4
            },
            {
              "scale": 1,
              "zoom": 5
            },
            {
              "scale": 2.18,
              "zoom": 6
            },
            {
              "scale": 2.18,
              "zoom": 7
            },
            {
              "scale": 2.25,
              "zoom": 8
            },
            {
              "scale": 2.4,
              "zoom": 9
            },
            {
              "scale": 2.4,
              "zoom": 10
            },
            {
              "scale": 2.26,
              "zoom": 11
            },
            {
              "scale": 2.15,
              "zoom": 12
            },
            {
              "scale": 2,
              "zoom": 13
            },
            {
              "scale": 1.9,
              "zoom": 14
            },
            {
              "scale": 1.86,
              "zoom": 15
            },
            {
              "scale": 1.88,
              "zoom": 16
            },
            {
              "scale": 1.53,
              "zoom": 17
            },
            {
              "scale": 1.28,
              "zoom": 18
            },
            {
              "scale": 1.11,
              "zoom": 19
            },
            {
              "scale": 1.01,
              "zoom": 20
            },
            {
              "scale": 0.96,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_3",
            "none": "is_tunnel"
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "scale": 0,
              "zoom": 0
            },
            {
              "scale": 0,
              "zoom": 1
            },
            {
              "scale": 0,
              "zoom": 2
            },
            {
              "scale": 0,
              "zoom": 3
            },
            {
              "scale": 0,
              "zoom": 4
            },
            {
              "scale": 0,
              "zoom": 5
            },
            {
              "scale": 0,
              "zoom": 6
            },
            {
              "scale": 0,
              "zoom": 7
            },
            {
              "scale": 0,
              "zoom": 8
            },
            {
              "scale": 2.79,
              "zoom": 9
            },
            {
              "scale": 2.91,
              "zoom": 10
            },
            {
              "scale": 1.86,
              "zoom": 11
            },
            {
              "scale": 1.86,
              "zoom": 12
            },
            {
              "scale": 1.54,
              "zoom": 13
            },
            {
              "scale": 1.32,
              "zoom": 14
            },
            {
              "scale": 1.2,
              "zoom": 15
            },
            {
              "scale": 1.15,
              "zoom": 16
            },
            {
              "scale": 1.01,
              "zoom": 17
            },
            {
              "scale": 0.93,
              "zoom": 18
            },
            {
              "scale": 0.91,
              "zoom": 19
            },
            {
              "scale": 0.93,
              "zoom": 20
            },
            {
              "scale": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_3"
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#c8ccd0"
            },
            {
              "scale": 1.14,
              "zoom": 0
            },
            {
              "scale": 1.14,
              "zoom": 1
            },
            {
              "scale": 1.14,
              "zoom": 2
            },
            {
              "scale": 1.14,
              "zoom": 3
            },
            {
              "scale": 1.14,
              "zoom": 4
            },
            {
              "scale": 1.14,
              "zoom": 5
            },
            {
              "scale": 1.14,
              "zoom": 6
            },
            {
              "scale": 1.14,
              "zoom": 7
            },
            {
              "scale": 0.92,
              "zoom": 8
            },
            {
              "scale": 3.01,
              "zoom": 9
            },
            {
              "scale": 1.95,
              "zoom": 10
            },
            {
              "scale": 1.46,
              "zoom": 11
            },
            {
              "scale": 1.52,
              "zoom": 12
            },
            {
              "scale": 1.35,
              "zoom": 13
            },
            {
              "scale": 1.22,
              "zoom": 14
            },
            {
              "scale": 1.14,
              "zoom": 15
            },
            {
              "scale": 1.11,
              "zoom": 16
            },
            {
              "scale": 0.98,
              "zoom": 17
            },
            {
              "scale": 0.9,
              "zoom": 18
            },
            {
              "scale": 0.88,
              "zoom": 19
            },
            {
              "scale": 0.9,
              "zoom": 20
            },
            {
              "scale": 0.96,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_4",
            "none": "is_tunnel"
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "scale": 0,
              "zoom": 0
            },
            {
              "scale": 0,
              "zoom": 1
            },
            {
              "scale": 0,
              "zoom": 2
            },
            {
              "scale": 0,
              "zoom": 3
            },
            {
              "scale": 0,
              "zoom": 4
            },
            {
              "scale": 0,
              "zoom": 5
            },
            {
              "scale": 0,
              "zoom": 6
            },
            {
              "scale": 0,
              "zoom": 7
            },
            {
              "scale": 0,
              "zoom": 8
            },
            {
              "scale": 0,
              "zoom": 9
            },
            {
              "scale": 1.88,
              "zoom": 10
            },
            {
              "scale": 1.4,
              "zoom": 11
            },
            {
              "scale": 1.57,
              "zoom": 12
            },
            {
              "scale": 1.32,
              "zoom": 13
            },
            {
              "scale": 1.16,
              "zoom": 14
            },
            {
              "scale": 1.07,
              "zoom": 15
            },
            {
              "scale": 1.28,
              "zoom": 16
            },
            {
              "scale": 1.1,
              "zoom": 17
            },
            {
              "scale": 0.99,
              "zoom": 18
            },
            {
              "scale": 0.94,
              "zoom": 19
            },
            {
              "scale": 0.95,
              "zoom": 20
            },
            {
              "scale": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_4"
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#c8ccd0"
            },
            {
              "scale": 1,
              "zoom": 0
            },
            {
              "scale": 1,
              "zoom": 1
            },
            {
              "scale": 1,
              "zoom": 2
            },
            {
              "scale": 1,
              "zoom": 3
            },
            {
              "scale": 1,
              "zoom": 4
            },
            {
              "scale": 1,
              "zoom": 5
            },
            {
              "scale": 1,
              "zoom": 6
            },
            {
              "scale": 1,
              "zoom": 7
            },
            {
              "scale": 1,
              "zoom": 8
            },
            {
              "scale": 0.8,
              "zoom": 9
            },
            {
              "scale": 1.36,
              "zoom": 10
            },
            {
              "scale": 1.15,
              "zoom": 11
            },
            {
              "scale": 1.3,
              "zoom": 12
            },
            {
              "scale": 1.17,
              "zoom": 13
            },
            {
              "scale": 1.08,
              "zoom": 14
            },
            {
              "scale": 1.03,
              "zoom": 15
            },
            {
              "scale": 1.21,
              "zoom": 16
            },
            {
              "scale": 1.05,
              "zoom": 17
            },
            {
              "scale": 0.96,
              "zoom": 18
            },
            {
              "scale": 0.91,
              "zoom": 19
            },
            {
              "scale": 0.91,
              "zoom": 20
            },
            {
              "scale": 0.96,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_5",
            "none": "is_tunnel"
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "scale": 0,
              "zoom": 0
            },
            {
              "scale": 0,
              "zoom": 1
            },
            {
              "scale": 0,
              "zoom": 2
            },
            {
              "scale": 0,
              "zoom": 3
            },
            {
              "scale": 0,
              "zoom": 4
            },
            {
              "scale": 0,
              "zoom": 5
            },
            {
              "scale": 0,
              "zoom": 6
            },
            {
              "scale": 0,
              "zoom": 7
            },
            {
              "scale": 0,
              "zoom": 8
            },
            {
              "scale": 0,
              "zoom": 9
            },
            {
              "scale": 0,
              "zoom": 10
            },
            {
              "scale": 0,
              "zoom": 11
            },
            {
              "scale": 1.39,
              "zoom": 12
            },
            {
              "scale": 1.05,
              "zoom": 13
            },
            {
              "scale": 0.9,
              "zoom": 14
            },
            {
              "scale": 1.05,
              "zoom": 15
            },
            {
              "scale": 1.22,
              "zoom": 16
            },
            {
              "scale": 1.04,
              "zoom": 17
            },
            {
              "scale": 0.94,
              "zoom": 18
            },
            {
              "scale": 0.91,
              "zoom": 19
            },
            {
              "scale": 0.93,
              "zoom": 20
            },
            {
              "scale": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_5"
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#c8ccd0"
            },
            {
              "scale": 1,
              "zoom": 0
            },
            {
              "scale": 1,
              "zoom": 1
            },
            {
              "scale": 1,
              "zoom": 2
            },
            {
              "scale": 1,
              "zoom": 3
            },
            {
              "scale": 1,
              "zoom": 4
            },
            {
              "scale": 1,
              "zoom": 5
            },
            {
              "scale": 1,
              "zoom": 6
            },
            {
              "scale": 1,
              "zoom": 7
            },
            {
              "scale": 1,
              "zoom": 8
            },
            {
              "scale": 1,
              "zoom": 9
            },
            {
              "scale": 1,
              "zoom": 10
            },
            {
              "scale": 0.44,
              "zoom": 11
            },
            {
              "scale": 1.15,
              "zoom": 12
            },
            {
              "scale": 0.97,
              "zoom": 13
            },
            {
              "scale": 0.87,
              "zoom": 14
            },
            {
              "scale": 1.01,
              "zoom": 15
            },
            {
              "scale": 1.16,
              "zoom": 16
            },
            {
              "scale": 1,
              "zoom": 17
            },
            {
              "scale": 0.91,
              "zoom": 18
            },
            {
              "scale": 0.88,
              "zoom": 19
            },
            {
              "scale": 0.89,
              "zoom": 20
            },
            {
              "scale": 0.96,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_6",
            "none": "is_tunnel"
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "scale": 0,
              "zoom": 0
            },
            {
              "scale": 0,
              "zoom": 1
            },
            {
              "scale": 0,
              "zoom": 2
            },
            {
              "scale": 0,
              "zoom": 3
            },
            {
              "scale": 0,
              "zoom": 4
            },
            {
              "scale": 0,
              "zoom": 5
            },
            {
              "scale": 0,
              "zoom": 6
            },
            {
              "scale": 0,
              "zoom": 7
            },
            {
              "scale": 0,
              "zoom": 8
            },
            {
              "scale": 0,
              "zoom": 9
            },
            {
              "scale": 0,
              "zoom": 10
            },
            {
              "scale": 0,
              "zoom": 11
            },
            {
              "scale": 0,
              "zoom": 12
            },
            {
              "scale": 2.5,
              "zoom": 13
            },
            {
              "scale": 1.41,
              "zoom": 14
            },
            {
              "scale": 1.39,
              "zoom": 15
            },
            {
              "scale": 1.45,
              "zoom": 16
            },
            {
              "scale": 1.16,
              "zoom": 17
            },
            {
              "scale": 1,
              "zoom": 18
            },
            {
              "scale": 0.94,
              "zoom": 19
            },
            {
              "scale": 0.94,
              "zoom": 20
            },
            {
              "scale": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_6"
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#c8ccd0"
            },
            {
              "scale": 1,
              "zoom": 0
            },
            {
              "scale": 1,
              "zoom": 1
            },
            {
              "scale": 1,
              "zoom": 2
            },
            {
              "scale": 1,
              "zoom": 3
            },
            {
              "scale": 1,
              "zoom": 4
            },
            {
              "scale": 1,
              "zoom": 5
            },
            {
              "scale": 1,
              "zoom": 6
            },
            {
              "scale": 1,
              "zoom": 7
            },
            {
              "scale": 1,
              "zoom": 8
            },
            {
              "scale": 1,
              "zoom": 9
            },
            {
              "scale": 1,
              "zoom": 10
            },
            {
              "scale": 1,
              "zoom": 11
            },
            {
              "scale": 1,
              "zoom": 12
            },
            {
              "scale": 1.65,
              "zoom": 13
            },
            {
              "scale": 1.21,
              "zoom": 14
            },
            {
              "scale": 1.26,
              "zoom": 15
            },
            {
              "scale": 1.35,
              "zoom": 16
            },
            {
              "scale": 1.1,
              "zoom": 17
            },
            {
              "scale": 0.97,
              "zoom": 18
            },
            {
              "scale": 0.91,
              "zoom": 19
            },
            {
              "scale": 0.91,
              "zoom": 20
            },
            {
              "scale": 0.96,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_7",
            "none": "is_tunnel"
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "scale": 0,
              "zoom": 0
            },
            {
              "scale": 0,
              "zoom": 1
            },
            {
              "scale": 0,
              "zoom": 2
            },
            {
              "scale": 0,
              "zoom": 3
            },
            {
              "scale": 0,
              "zoom": 4
            },
            {
              "scale": 0,
              "zoom": 5
            },
            {
              "scale": 0,
              "zoom": 6
            },
            {
              "scale": 0,
              "zoom": 7
            },
            {
              "scale": 0,
              "zoom": 8
            },
            {
              "scale": 0,
              "zoom": 9
            },
            {
              "scale": 0,
              "zoom": 10
            },
            {
              "scale": 0,
              "zoom": 11
            },
            {
              "scale": 0,
              "zoom": 12
            },
            {
              "scale": 0,
              "zoom": 13
            },
            {
              "scale": 1,
              "zoom": 14
            },
            {
              "scale": 0.87,
              "zoom": 15
            },
            {
              "scale": 0.97,
              "zoom": 16
            },
            {
              "scale": 0.89,
              "zoom": 17
            },
            {
              "scale": 0.86,
              "zoom": 18
            },
            {
              "scale": 0.88,
              "zoom": 19
            },
            {
              "scale": 0.92,
              "zoom": 20
            },
            {
              "scale": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_7"
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#c8ccd0"
            },
            {
              "scale": 1,
              "zoom": 0
            },
            {
              "scale": 1,
              "zoom": 1
            },
            {
              "scale": 1,
              "zoom": 2
            },
            {
              "scale": 1,
              "zoom": 3
            },
            {
              "scale": 1,
              "zoom": 4
            },
            {
              "scale": 1,
              "zoom": 5
            },
            {
              "scale": 1,
              "zoom": 6
            },
            {
              "scale": 1,
              "zoom": 7
            },
            {
              "scale": 1,
              "zoom": 8
            },
            {
              "scale": 1,
              "zoom": 9
            },
            {
              "scale": 1,
              "zoom": 10
            },
            {
              "scale": 1,
              "zoom": 11
            },
            {
              "scale": 1,
              "zoom": 12
            },
            {
              "scale": 1,
              "zoom": 13
            },
            {
              "scale": 0.93,
              "zoom": 14
            },
            {
              "scale": 0.85,
              "zoom": 15
            },
            {
              "scale": 0.94,
              "zoom": 16
            },
            {
              "scale": 0.86,
              "zoom": 17
            },
            {
              "scale": 0.83,
              "zoom": 18
            },
            {
              "scale": 0.84,
              "zoom": 19
            },
            {
              "scale": 0.88,
              "zoom": 20
            },
            {
              "scale": 0.95,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_minor",
            "none": "is_tunnel"
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "scale": 0,
              "zoom": 0
            },
            {
              "scale": 0,
              "zoom": 1
            },
            {
              "scale": 0,
              "zoom": 2
            },
            {
              "scale": 0,
              "zoom": 3
            },
            {
              "scale": 0,
              "zoom": 4
            },
            {
              "scale": 0,
              "zoom": 5
            },
            {
              "scale": 0,
              "zoom": 6
            },
            {
              "scale": 0,
              "zoom": 7
            },
            {
              "scale": 0,
              "zoom": 8
            },
            {
              "scale": 0,
              "zoom": 9
            },
            {
              "scale": 0,
              "zoom": 10
            },
            {
              "scale": 0,
              "zoom": 11
            },
            {
              "scale": 0,
              "zoom": 12
            },
            {
              "scale": 0,
              "zoom": 13
            },
            {
              "scale": 0,
              "zoom": 14
            },
            {
              "scale": 0,
              "zoom": 15
            },
            {
              "scale": 1,
              "zoom": 16
            },
            {
              "scale": 1,
              "zoom": 17
            },
            {
              "scale": 1,
              "zoom": 18
            },
            {
              "scale": 1,
              "zoom": 19
            },
            {
              "scale": 1,
              "zoom": 20
            },
            {
              "scale": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_minor"
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#c8ccd0"
            },
            {
              "scale": 0.29,
              "zoom": 0
            },
            {
              "scale": 0.29,
              "zoom": 1
            },
            {
              "scale": 0.29,
              "zoom": 2
            },
            {
              "scale": 0.29,
              "zoom": 3
            },
            {
              "scale": 0.29,
              "zoom": 4
            },
            {
              "scale": 0.29,
              "zoom": 5
            },
            {
              "scale": 0.29,
              "zoom": 6
            },
            {
              "scale": 0.29,
              "zoom": 7
            },
            {
              "scale": 0.29,
              "zoom": 8
            },
            {
              "scale": 0.29,
              "zoom": 9
            },
            {
              "scale": 0.29,
              "zoom": 10
            },
            {
              "scale": 0.29,
              "zoom": 11
            },
            {
              "scale": 0.29,
              "zoom": 12
            },
            {
              "scale": 0.29,
              "zoom": 13
            },
            {
              "scale": 0.29,
              "zoom": 14
            },
            {
              "scale": 0.29,
              "zoom": 15
            },
            {
              "scale": 1,
              "zoom": 16
            },
            {
              "scale": 0.9,
              "zoom": 17
            },
            {
              "scale": 0.91,
              "zoom": 18
            },
            {
              "scale": 0.92,
              "zoom": 19
            },
            {
              "scale": 0.93,
              "zoom": 20
            },
            {
              "scale": 0.95,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_unclassified",
            "none": "is_tunnel"
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "scale": 0,
              "zoom": 0
            },
            {
              "scale": 0,
              "zoom": 1
            },
            {
              "scale": 0,
              "zoom": 2
            },
            {
              "scale": 0,
              "zoom": 3
            },
            {
              "scale": 0,
              "zoom": 4
            },
            {
              "scale": 0,
              "zoom": 5
            },
            {
              "scale": 0,
              "zoom": 6
            },
            {
              "scale": 0,
              "zoom": 7
            },
            {
              "scale": 0,
              "zoom": 8
            },
            {
              "scale": 0,
              "zoom": 9
            },
            {
              "scale": 0,
              "zoom": 10
            },
            {
              "scale": 0,
              "zoom": 11
            },
            {
              "scale": 0,
              "zoom": 12
            },
            {
              "scale": 0,
              "zoom": 13
            },
            {
              "scale": 0,
              "zoom": 14
            },
            {
              "scale": 0,
              "zoom": 15
            },
            {
              "scale": 1,
              "zoom": 16
            },
            {
              "scale": 1,
              "zoom": 17
            },
            {
              "scale": 1,
              "zoom": 18
            },
            {
              "scale": 1,
              "zoom": 19
            },
            {
              "scale": 1,
              "zoom": 20
            },
            {
              "scale": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "road_unclassified"
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#c8ccd0"
            },
            {
              "scale": 0.29,
              "zoom": 0
            },
            {
              "scale": 0.29,
              "zoom": 1
            },
            {
              "scale": 0.29,
              "zoom": 2
            },
            {
              "scale": 0.29,
              "zoom": 3
            },
            {
              "scale": 0.29,
              "zoom": 4
            },
            {
              "scale": 0.29,
              "zoom": 5
            },
            {
              "scale": 0.29,
              "zoom": 6
            },
            {
              "scale": 0.29,
              "zoom": 7
            },
            {
              "scale": 0.29,
              "zoom": 8
            },
            {
              "scale": 0.29,
              "zoom": 9
            },
            {
              "scale": 0.29,
              "zoom": 10
            },
            {
              "scale": 0.29,
              "zoom": 11
            },
            {
              "scale": 0.29,
              "zoom": 12
            },
            {
              "scale": 0.29,
              "zoom": 13
            },
            {
              "scale": 0.29,
              "zoom": 14
            },
            {
              "scale": 0.29,
              "zoom": 15
            },
            {
              "scale": 1,
              "zoom": 16
            },
            {
              "scale": 0.9,
              "zoom": 17
            },
            {
              "scale": 0.91,
              "zoom": 18
            },
            {
              "scale": 0.92,
              "zoom": 19
            },
            {
              "scale": 0.93,
              "zoom": 20
            },
            {
              "scale": 0.95,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "all": "is_tunnel",
            "none": "path"
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#dcdee0",
              "zoom": 0
            },
            {
              "color": "#dcdee0",
              "zoom": 1
            },
            {
              "color": "#dcdee0",
              "zoom": 2
            },
            {
              "color": "#dcdee0",
              "zoom": 3
            },
            {
              "color": "#dcdee0",
              "zoom": 4
            },
            {
              "color": "#dcdee0",
              "zoom": 5
            },
            {
              "color": "#dcdee0",
              "zoom": 6
            },
            {
              "color": "#dcdee0",
              "zoom": 7
            },
            {
              "color": "#dcdee0",
              "zoom": 8
            },
            {
              "color": "#dcdee0",
              "zoom": 9
            },
            {
              "color": "#dcdee0",
              "zoom": 10
            },
            {
              "color": "#dcdee0",
              "zoom": 11
            },
            {
              "color": "#dcdee0",
              "zoom": 12
            },
            {
              "color": "#dcdee0",
              "zoom": 13
            },
            {
              "color": "#e1e3e5",
              "zoom": 14
            },
            {
              "color": "#e6e8ea",
              "zoom": 15
            },
            {
              "color": "#e7e9eb",
              "zoom": 16
            },
            {
              "color": "#e8eaeb",
              "zoom": 17
            },
            {
              "color": "#e9eaec",
              "zoom": 18
            },
            {
              "color": "#eaebed",
              "zoom": 19
            },
            {
              "color": "#ebeced",
              "zoom": 20
            },
            {
              "color": "#ecedee",
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "all": "path",
            "none": "is_tunnel"
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#c8ccd0"
            }
          ]
        },
        {
          "tags": {
            "all": "path",
            "none": "is_tunnel"
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "opacity": 0.7
            },
            {
              "color": "#e1e3e5",
              "zoom": 0
            },
            {
              "color": "#e1e3e5",
              "zoom": 1
            },
            {
              "color": "#e1e3e5",
              "zoom": 2
            },
            {
              "color": "#e1e3e5",
              "zoom": 3
            },
            {
              "color": "#e1e3e5",
              "zoom": 4
            },
            {
              "color": "#e1e3e5",
              "zoom": 5
            },
            {
              "color": "#e1e3e5",
              "zoom": 6
            },
            {
              "color": "#e1e3e5",
              "zoom": 7
            },
            {
              "color": "#e1e3e5",
              "zoom": 8
            },
            {
              "color": "#e1e3e5",
              "zoom": 9
            },
            {
              "color": "#e1e3e5",
              "zoom": 10
            },
            {
              "color": "#e1e3e5",
              "zoom": 11
            },
            {
              "color": "#e1e3e5",
              "zoom": 12
            },
            {
              "color": "#e1e3e5",
              "zoom": 13
            },
            {
              "color": "#e6e8e9",
              "zoom": 14
            },
            {
              "color": "#ecedee",
              "zoom": 15
            },
            {
              "color": "#edeeef",
              "zoom": 16
            },
            {
              "color": "#eeeff0",
              "zoom": 17
            },
            {
              "color": "#eeeff0",
              "zoom": 18
            },
            {
              "color": "#eff0f1",
              "zoom": 19
            },
            {
              "color": "#f0f1f2",
              "zoom": 20
            },
            {
              "color": "#f1f2f3",
              "zoom": 21
            }
          ]
        },
        {
          "tags": "road_construction",
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "tags": "road_construction",
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#e4e6e8",
              "zoom": 0
            },
            {
              "color": "#e4e6e8",
              "zoom": 1
            },
            {
              "color": "#e4e6e8",
              "zoom": 2
            },
            {
              "color": "#e4e6e8",
              "zoom": 3
            },
            {
              "color": "#e4e6e8",
              "zoom": 4
            },
            {
              "color": "#e4e6e8",
              "zoom": 5
            },
            {
              "color": "#e4e6e8",
              "zoom": 6
            },
            {
              "color": "#e4e6e8",
              "zoom": 7
            },
            {
              "color": "#e4e6e8",
              "zoom": 8
            },
            {
              "color": "#e4e6e8",
              "zoom": 9
            },
            {
              "color": "#e4e6e8",
              "zoom": 10
            },
            {
              "color": "#e4e6e8",
              "zoom": 11
            },
            {
              "color": "#e4e6e8",
              "zoom": 12
            },
            {
              "color": "#e4e6e8",
              "zoom": 13
            },
            {
              "color": "#c8ccd0",
              "zoom": 14
            },
            {
              "color": "#e4e6e8",
              "zoom": 15
            },
            {
              "color": "#e8eaec",
              "zoom": 16
            },
            {
              "color": "#edeef0",
              "zoom": 17
            },
            {
              "color": "#f1f2f3",
              "zoom": 18
            },
            {
              "color": "#f6f7f7",
              "zoom": 19
            },
            {
              "color": "#fafbfb",
              "zoom": 20
            },
            {
              "color": "#ffffff",
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "ferry"
          },
          "stylers": [
            {
              "color": "#919ba4"
            }
          ]
        },
        {
          "tags": "transit_location",
          "elements": "label.icon",
          "stylers": [
            {
              "opacity": 0,
              "saturation": -1
            },
            {
              "opacity": 0,
              "zoom": 0
            },
            {
              "opacity": 0,
              "zoom": 1
            },
            {
              "opacity": 0,
              "zoom": 2
            },
            {
              "opacity": 0,
              "zoom": 3
            },
            {
              "opacity": 0,
              "zoom": 4
            },
            {
              "opacity": 0,
              "zoom": 5
            },
            {
              "opacity": 0,
              "zoom": 6
            },
            {
              "opacity": 0,
              "zoom": 7
            },
            {
              "opacity": 0,
              "zoom": 8
            },
            {
              "opacity": 0,
              "zoom": 9
            },
            {
              "opacity": 0,
              "zoom": 10
            },
            {
              "opacity": 0,
              "zoom": 11
            },
            {
              "opacity": 0,
              "zoom": 12
            },
            {
              "opacity": 0,
              "zoom": 13
            },
            {
              "opacity": 0,
              "zoom": 14
            },
            {
              "opacity": 0,
              "zoom": 15
            },
            {
              "opacity": 0,
              "zoom": 16
            },
            {
              "opacity": 0,
              "zoom": 17
            },
            {
              "opacity": 0,
              "zoom": 18
            },
            {
              "opacity": 0,
              "zoom": 19
            },
            {
              "opacity": 0,
              "zoom": 20
            },
            {
              "opacity": 0,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "transit_location",
          "elements": "label.text",
          "stylers": [
            {
              "opacity": 0,
              "zoom": 0
            },
            {
              "opacity": 0,
              "zoom": 1
            },
            {
              "opacity": 0,
              "zoom": 2
            },
            {
              "opacity": 0,
              "zoom": 3
            },
            {
              "opacity": 0,
              "zoom": 4
            },
            {
              "opacity": 0,
              "zoom": 5
            },
            {
              "opacity": 0,
              "zoom": 6
            },
            {
              "opacity": 0,
              "zoom": 7
            },
            {
              "opacity": 0,
              "zoom": 8
            },
            {
              "opacity": 0,
              "zoom": 9
            },
            {
              "opacity": 0,
              "zoom": 10
            },
            {
              "opacity": 0,
              "zoom": 11
            },
            {
              "opacity": 0,
              "zoom": 12
            },
            {
              "opacity": 0,
              "zoom": 13
            },
            {
              "opacity": 0,
              "zoom": 14
            },
            {
              "opacity": 0,
              "zoom": 15
            },
            {
              "opacity": 0,
              "zoom": 16
            },
            {
              "opacity": 0,
              "zoom": 17
            },
            {
              "opacity": 0,
              "zoom": 18
            },
            {
              "opacity": 0,
              "zoom": 19
            },
            {
              "opacity": 0,
              "zoom": 20
            },
            {
              "opacity": 0,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "transit_location",
          "elements": "label.text.fill",
          "stylers": [
            {
              "opacity": 0,
              "color": "#6c8993"
            }
          ]
        },
        {
          "tags": "transit_location",
          "elements": "label.text.outline",
          "stylers": [
            {
              "opacity": 0,
              "color": "#ffffff"
            }
          ]
        },
        {
          "tags": "transit_schema",
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#6c8993"
            },
            {
              "scale": 0.7
            },
            {
              "opacity": 0.6,
              "zoom": 0
            },
            {
              "opacity": 0.6,
              "zoom": 1
            },
            {
              "opacity": 0.6,
              "zoom": 2
            },
            {
              "opacity": 0.6,
              "zoom": 3
            },
            {
              "opacity": 0.6,
              "zoom": 4
            },
            {
              "opacity": 0.6,
              "zoom": 5
            },
            {
              "opacity": 0.6,
              "zoom": 6
            },
            {
              "opacity": 0.6,
              "zoom": 7
            },
            {
              "opacity": 0.6,
              "zoom": 8
            },
            {
              "opacity": 0.6,
              "zoom": 9
            },
            {
              "opacity": 0.6,
              "zoom": 10
            },
            {
              "opacity": 0.6,
              "zoom": 11
            },
            {
              "opacity": 0.6,
              "zoom": 12
            },
            {
              "opacity": 0.6,
              "zoom": 13
            },
            {
              "opacity": 0.6,
              "zoom": 14
            },
            {
              "opacity": 0.5,
              "zoom": 15
            },
            {
              "opacity": 0.4,
              "zoom": 16
            },
            {
              "opacity": 0.4,
              "zoom": 17
            },
            {
              "opacity": 0.4,
              "zoom": 18
            },
            {
              "opacity": 0.4,
              "zoom": 19
            },
            {
              "opacity": 0.4,
              "zoom": 20
            },
            {
              "opacity": 0.4,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "transit_schema",
          "elements": "geometry.outline",
          "stylers": [
            {
              "opacity": 0
            }
          ]
        },
        {
          "tags": "transit_line",
          "elements": "geometry.fill.pattern",
          "stylers": [
            {
              "color": "#949c9e"
            },
            {
              "opacity": 0,
              "zoom": 0
            },
            {
              "opacity": 0,
              "zoom": 1
            },
            {
              "opacity": 0,
              "zoom": 2
            },
            {
              "opacity": 0,
              "zoom": 3
            },
            {
              "opacity": 0,
              "zoom": 4
            },
            {
              "opacity": 0,
              "zoom": 5
            },
            {
              "opacity": 0,
              "zoom": 6
            },
            {
              "opacity": 0,
              "zoom": 7
            },
            {
              "opacity": 0,
              "zoom": 8
            },
            {
              "opacity": 0,
              "zoom": 9
            },
            {
              "opacity": 0,
              "zoom": 10
            },
            {
              "opacity": 0,
              "zoom": 11
            },
            {
              "opacity": 0,
              "zoom": 12
            },
            {
              "opacity": 1,
              "zoom": 13
            },
            {
              "opacity": 1,
              "zoom": 14
            },
            {
              "opacity": 1,
              "zoom": 15
            },
            {
              "opacity": 1,
              "zoom": 16
            },
            {
              "opacity": 1,
              "zoom": 17
            },
            {
              "opacity": 1,
              "zoom": 18
            },
            {
              "opacity": 1,
              "zoom": 19
            },
            {
              "opacity": 1,
              "zoom": 20
            },
            {
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "transit_line",
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#949c9e"
            },
            {
              "scale": 0.4
            },
            {
              "opacity": 0,
              "zoom": 0
            },
            {
              "opacity": 0,
              "zoom": 1
            },
            {
              "opacity": 0,
              "zoom": 2
            },
            {
              "opacity": 0,
              "zoom": 3
            },
            {
              "opacity": 0,
              "zoom": 4
            },
            {
              "opacity": 0,
              "zoom": 5
            },
            {
              "opacity": 0,
              "zoom": 6
            },
            {
              "opacity": 0,
              "zoom": 7
            },
            {
              "opacity": 0,
              "zoom": 8
            },
            {
              "opacity": 0,
              "zoom": 9
            },
            {
              "opacity": 0,
              "zoom": 10
            },
            {
              "opacity": 0,
              "zoom": 11
            },
            {
              "opacity": 0,
              "zoom": 12
            },
            {
              "opacity": 1,
              "zoom": 13
            },
            {
              "opacity": 1,
              "zoom": 14
            },
            {
              "opacity": 1,
              "zoom": 15
            },
            {
              "opacity": 1,
              "zoom": 16
            },
            {
              "opacity": 1,
              "zoom": 17
            },
            {
              "opacity": 1,
              "zoom": 18
            },
            {
              "opacity": 1,
              "zoom": 19
            },
            {
              "opacity": 1,
              "zoom": 20
            },
            {
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "water",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#adb4bb",
              "zoom": 0
            },
            {
              "color": "#adb4bb",
              "zoom": 1
            },
            {
              "color": "#adb4bb",
              "zoom": 2
            },
            {
              "color": "#adb4bb",
              "zoom": 3
            },
            {
              "color": "#adb4bb",
              "zoom": 4
            },
            {
              "color": "#adb4bb",
              "zoom": 5
            },
            {
              "color": "#adb4bb",
              "zoom": 6
            },
            {
              "color": "#adb4bb",
              "zoom": 7
            },
            {
              "color": "#afb6bd",
              "zoom": 8
            },
            {
              "color": "#b1b7be",
              "zoom": 9
            },
            {
              "color": "#b3b9c0",
              "zoom": 10
            },
            {
              "color": "#b4bac1",
              "zoom": 11
            },
            {
              "color": "#b4bbc1",
              "zoom": 12
            },
            {
              "color": "#b5bcc2",
              "zoom": 13
            },
            {
              "color": "#b6bdc3",
              "zoom": 14
            },
            {
              "color": "#b8bec4",
              "zoom": 15
            },
            {
              "color": "#b9c0c5",
              "zoom": 16
            },
            {
              "color": "#bbc1c6",
              "zoom": 17
            },
            {
              "color": "#bcc2c8",
              "zoom": 18
            },
            {
              "color": "#bec3c9",
              "zoom": 19
            },
            {
              "color": "#bfc5ca",
              "zoom": 20
            },
            {
              "color": "#c1c6cb",
              "zoom": 21
            }
          ]
        },
        {
          "tags": "water",
          "elements": "geometry",
          "types": "polyline",
          "stylers": [
            {
              "opacity": 0.4,
              "zoom": 0
            },
            {
              "opacity": 0.4,
              "zoom": 1
            },
            {
              "opacity": 0.4,
              "zoom": 2
            },
            {
              "opacity": 0.4,
              "zoom": 3
            },
            {
              "opacity": 0.6,
              "zoom": 4
            },
            {
              "opacity": 0.8,
              "zoom": 5
            },
            {
              "opacity": 1,
              "zoom": 6
            },
            {
              "opacity": 1,
              "zoom": 7
            },
            {
              "opacity": 1,
              "zoom": 8
            },
            {
              "opacity": 1,
              "zoom": 9
            },
            {
              "opacity": 1,
              "zoom": 10
            },
            {
              "opacity": 1,
              "zoom": 11
            },
            {
              "opacity": 1,
              "zoom": 12
            },
            {
              "opacity": 1,
              "zoom": 13
            },
            {
              "opacity": 1,
              "zoom": 14
            },
            {
              "opacity": 1,
              "zoom": 15
            },
            {
              "opacity": 1,
              "zoom": 16
            },
            {
              "opacity": 1,
              "zoom": 17
            },
            {
              "opacity": 1,
              "zoom": 18
            },
            {
              "opacity": 1,
              "zoom": 19
            },
            {
              "opacity": 1,
              "zoom": 20
            },
            {
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "bathymetry",
          "elements": "geometry",
          "stylers": [
            {
              "hue": "#adb4bb"
            }
          ]
        },
        {
          "tags": {
            "any": [
              "industrial",
              "construction_site"
            ]
          },
          "elements": "geometry",
          "stylers": [
            {
              "color": "#dcdee0",
              "zoom": 0
            },
            {
              "color": "#dcdee0",
              "zoom": 1
            },
            {
              "color": "#dcdee0",
              "zoom": 2
            },
            {
              "color": "#dcdee0",
              "zoom": 3
            },
            {
              "color": "#dcdee0",
              "zoom": 4
            },
            {
              "color": "#dcdee0",
              "zoom": 5
            },
            {
              "color": "#dcdee0",
              "zoom": 6
            },
            {
              "color": "#dcdee0",
              "zoom": 7
            },
            {
              "color": "#dcdee0",
              "zoom": 8
            },
            {
              "color": "#dcdee0",
              "zoom": 9
            },
            {
              "color": "#dcdee0",
              "zoom": 10
            },
            {
              "color": "#dcdee0",
              "zoom": 11
            },
            {
              "color": "#dcdee0",
              "zoom": 12
            },
            {
              "color": "#dcdee0",
              "zoom": 13
            },
            {
              "color": "#e1e3e5",
              "zoom": 14
            },
            {
              "color": "#e7e8ea",
              "zoom": 15
            },
            {
              "color": "#e8e9eb",
              "zoom": 16
            },
            {
              "color": "#e9eaeb",
              "zoom": 17
            },
            {
              "color": "#e9eaec",
              "zoom": 18
            },
            {
              "color": "#eaebed",
              "zoom": 19
            },
            {
              "color": "#ebeced",
              "zoom": 20
            },
            {
              "color": "#ecedee",
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "transit",
            "none": [
              "transit_location",
              "transit_line",
              "transit_schema",
              "is_unclassified_transit"
            ]
          },
          "elements": "geometry",
          "stylers": [
            {
              "color": "#dcdee0",
              "zoom": 0
            },
            {
              "color": "#dcdee0",
              "zoom": 1
            },
            {
              "color": "#dcdee0",
              "zoom": 2
            },
            {
              "color": "#dcdee0",
              "zoom": 3
            },
            {
              "color": "#dcdee0",
              "zoom": 4
            },
            {
              "color": "#dcdee0",
              "zoom": 5
            },
            {
              "color": "#dcdee0",
              "zoom": 6
            },
            {
              "color": "#dcdee0",
              "zoom": 7
            },
            {
              "color": "#dcdee0",
              "zoom": 8
            },
            {
              "color": "#dcdee0",
              "zoom": 9
            },
            {
              "color": "#dcdee0",
              "zoom": 10
            },
            {
              "color": "#dcdee0",
              "zoom": 11
            },
            {
              "color": "#dcdee0",
              "zoom": 12
            },
            {
              "color": "#dcdee0",
              "zoom": 13
            },
            {
              "color": "#e1e3e5",
              "zoom": 14
            },
            {
              "color": "#e7e8ea",
              "zoom": 15
            },
            {
              "color": "#e8e9eb",
              "zoom": 16
            },
            {
              "color": "#e9eaeb",
              "zoom": 17
            },
            {
              "color": "#e9eaec",
              "zoom": 18
            },
            {
              "color": "#eaebed",
              "zoom": 19
            },
            {
              "color": "#ebeced",
              "zoom": 20
            },
            {
              "color": "#ecedee",
              "zoom": 21
            }
          ]
        },
        {
          "tags": "fence",
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#d1d4d6"
            },
            {
              "opacity": 0.75,
              "zoom": 0
            },
            {
              "opacity": 0.75,
              "zoom": 1
            },
            {
              "opacity": 0.75,
              "zoom": 2
            },
            {
              "opacity": 0.75,
              "zoom": 3
            },
            {
              "opacity": 0.75,
              "zoom": 4
            },
            {
              "opacity": 0.75,
              "zoom": 5
            },
            {
              "opacity": 0.75,
              "zoom": 6
            },
            {
              "opacity": 0.75,
              "zoom": 7
            },
            {
              "opacity": 0.75,
              "zoom": 8
            },
            {
              "opacity": 0.75,
              "zoom": 9
            },
            {
              "opacity": 0.75,
              "zoom": 10
            },
            {
              "opacity": 0.75,
              "zoom": 11
            },
            {
              "opacity": 0.75,
              "zoom": 12
            },
            {
              "opacity": 0.75,
              "zoom": 13
            },
            {
              "opacity": 0.75,
              "zoom": 14
            },
            {
              "opacity": 0.75,
              "zoom": 15
            },
            {
              "opacity": 0.75,
              "zoom": 16
            },
            {
              "opacity": 0.45,
              "zoom": 17
            },
            {
              "opacity": 0.45,
              "zoom": 18
            },
            {
              "opacity": 0.45,
              "zoom": 19
            },
            {
              "opacity": 0.45,
              "zoom": 20
            },
            {
              "opacity": 0.45,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "medical",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#dcdee0",
              "zoom": 0
            },
            {
              "color": "#dcdee0",
              "zoom": 1
            },
            {
              "color": "#dcdee0",
              "zoom": 2
            },
            {
              "color": "#dcdee0",
              "zoom": 3
            },
            {
              "color": "#dcdee0",
              "zoom": 4
            },
            {
              "color": "#dcdee0",
              "zoom": 5
            },
            {
              "color": "#dcdee0",
              "zoom": 6
            },
            {
              "color": "#dcdee0",
              "zoom": 7
            },
            {
              "color": "#dcdee0",
              "zoom": 8
            },
            {
              "color": "#dcdee0",
              "zoom": 9
            },
            {
              "color": "#dcdee0",
              "zoom": 10
            },
            {
              "color": "#dcdee0",
              "zoom": 11
            },
            {
              "color": "#dcdee0",
              "zoom": 12
            },
            {
              "color": "#dcdee0",
              "zoom": 13
            },
            {
              "color": "#e1e3e5",
              "zoom": 14
            },
            {
              "color": "#e7e8ea",
              "zoom": 15
            },
            {
              "color": "#e8e9eb",
              "zoom": 16
            },
            {
              "color": "#e9eaeb",
              "zoom": 17
            },
            {
              "color": "#e9eaec",
              "zoom": 18
            },
            {
              "color": "#eaebed",
              "zoom": 19
            },
            {
              "color": "#ebeced",
              "zoom": 20
            },
            {
              "color": "#ecedee",
              "zoom": 21
            }
          ]
        },
        {
          "tags": "beach",
          "elements": "geometry",
          "stylers": [
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 0
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 1
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 2
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 3
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 4
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 5
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 6
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 7
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 8
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 9
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 10
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 11
            },
            {
              "color": "#dcdee0",
              "opacity": 0.3,
              "zoom": 12
            },
            {
              "color": "#dcdee0",
              "opacity": 0.65,
              "zoom": 13
            },
            {
              "color": "#e1e3e5",
              "opacity": 1,
              "zoom": 14
            },
            {
              "color": "#e7e8ea",
              "opacity": 1,
              "zoom": 15
            },
            {
              "color": "#e8e9eb",
              "opacity": 1,
              "zoom": 16
            },
            {
              "color": "#e9eaeb",
              "opacity": 1,
              "zoom": 17
            },
            {
              "color": "#e9eaec",
              "opacity": 1,
              "zoom": 18
            },
            {
              "color": "#eaebed",
              "opacity": 1,
              "zoom": 19
            },
            {
              "color": "#ebeced",
              "opacity": 1,
              "zoom": 20
            },
            {
              "color": "#ecedee",
              "opacity": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "all": [
              "is_tunnel",
              "path"
            ]
          },
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#c3c7cb"
            },
            {
              "opacity": 0.3
            }
          ]
        },
        {
          "tags": {
            "all": [
              "is_tunnel",
              "path"
            ]
          },
          "elements": "geometry.outline",
          "stylers": [
            {
              "opacity": 0
            }
          ]
        },
        {
          "tags": "road_limited",
          "elements": "geometry.fill",
          "stylers": [
            {
              "color": "#c8ccd0"
            },
            {
              "scale": 0,
              "zoom": 0
            },
            {
              "scale": 0,
              "zoom": 1
            },
            {
              "scale": 0,
              "zoom": 2
            },
            {
              "scale": 0,
              "zoom": 3
            },
            {
              "scale": 0,
              "zoom": 4
            },
            {
              "scale": 0,
              "zoom": 5
            },
            {
              "scale": 0,
              "zoom": 6
            },
            {
              "scale": 0,
              "zoom": 7
            },
            {
              "scale": 0,
              "zoom": 8
            },
            {
              "scale": 0,
              "zoom": 9
            },
            {
              "scale": 0,
              "zoom": 10
            },
            {
              "scale": 0,
              "zoom": 11
            },
            {
              "scale": 0,
              "zoom": 12
            },
            {
              "scale": 0.1,
              "zoom": 13
            },
            {
              "scale": 0.2,
              "zoom": 14
            },
            {
              "scale": 0.3,
              "zoom": 15
            },
            {
              "scale": 0.5,
              "zoom": 16
            },
            {
              "scale": 0.6,
              "zoom": 17
            },
            {
              "scale": 0.7,
              "zoom": 18
            },
            {
              "scale": 0.88,
              "zoom": 19
            },
            {
              "scale": 0.92,
              "zoom": 20
            },
            {
              "scale": 1,
              "zoom": 21
            }
          ]
        },
        {
          "tags": "road_limited",
          "elements": "geometry.outline",
          "stylers": [
            {
              "color": "#c8ccd0"
            },
            {
              "scale": 1,
              "zoom": 0
            },
            {
              "scale": 1,
              "zoom": 1
            },
            {
              "scale": 1,
              "zoom": 2
            },
            {
              "scale": 1,
              "zoom": 3
            },
            {
              "scale": 1,
              "zoom": 4
            },
            {
              "scale": 1,
              "zoom": 5
            },
            {
              "scale": 1,
              "zoom": 6
            },
            {
              "scale": 1,
              "zoom": 7
            },
            {
              "scale": 1,
              "zoom": 8
            },
            {
              "scale": 1,
              "zoom": 9
            },
            {
              "scale": 1,
              "zoom": 10
            },
            {
              "scale": 1,
              "zoom": 11
            },
            {
              "scale": 1,
              "zoom": 12
            },
            {
              "scale": 0.1,
              "zoom": 13
            },
            {
              "scale": 0.2,
              "zoom": 14
            },
            {
              "scale": 0.3,
              "zoom": 15
            },
            {
              "scale": 0.5,
              "zoom": 16
            },
            {
              "scale": 0.6,
              "zoom": 17
            },
            {
              "scale": 0.7,
              "zoom": 18
            },
            {
              "scale": 0.84,
              "zoom": 19
            },
            {
              "scale": 0.88,
              "zoom": 20
            },
            {
              "scale": 0.95,
              "zoom": 21
            }
          ]
        },
        {
          "tags": {
            "any": "landcover",
            "none": "vegetation"
          },
          "stylers": {
            "visibility": "off"
          }
        }
      ]
    }))
  } else {
    console.error("Элемент не найден!");
  }
});


document.addEventListener("DOMContentLoaded", function () {
  /* Дожидаемся отрисовки элемента */
  function waitForElement(selector, callback) {
    const observer = new MutationObserver(function (mutationsList, observer) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(element => {
        if (element) {
          callback(element);
          observer.disconnect();
        }
      });
    });

    observer.observe(document.body, {childList: true, subtree: true});
  }

  /* Маркер поверх остальных при наведении/клике */
  function topMarker(marker) {
    let parent = marker.parentNode.parentNode;

    /* При наведении */
    marker.addEventListener('mouseover', () => {
      parent.classList.add('hover');
      marker.style.transition = '.3s all ease-in-out';
    });

    /* При окончании наведения */
    marker.addEventListener('mouseleave', () => {
      parent.classList.remove('hover');
    });

    /* При клике */
    marker.addEventListener('click', (event) => {
      const element = event.currentTarget;
      const parentMarker = element.parentNode.parentNode;
      const backgrounds = parentMarker.querySelectorAll('.ymaps3--default-marker__background');

      backgrounds.forEach(background => {
        background.classList.remove('active');
      });

      parentMarker.classList.toggle('active');
    });
  }

  /* Дожидаемся отрисовки маркеров */
  waitForElement('.ymaps3--hint.ymaps3--hint__stable', function (text) {
    const parent = text.parentNode.parentNode;
    const background = parent.querySelector('.ymaps3--default-marker__background');
    const stroke = parent.querySelector('.ymaps3--default-marker__stroke');

    topMarker(text);
    topMarker(stroke);
    topMarker(background);

    /* Удаляем br из описания */
    const subtitles = text.querySelectorAll('.ymaps3--hint-subtitle');

    subtitles.forEach(subtitle => {
      subtitle.innerHTML = subtitle.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/&lt;br&gt;/gi, ' ');
    });
  });
});