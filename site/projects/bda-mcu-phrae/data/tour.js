/*
 * ข้อมูลทัวร์ 360° หอพุทธศิลป์ — สร้างโดย tools/build_tour.py
 * แก้ชื่อ/คำบรรยาย/จุดข้อมูล (infos) ได้โดยตรง หรือแก้ใน build_tour.py แล้วรันใหม่
 * ความหมายของแต่ละช่อง ดู README.md
 */
window.TOUR = {
  "title": "หอพุทธศิลป์",
  "subtitle": "พิพิธภัณฑ์เสมือนจริง 360° · มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตแพร่",
  "firstScene": "p220",
  "floorPlan": {
    "image": null,
    "rooms": [
      {
        "label": "ห้องจัดแสดง หอพุทธศิลป์",
        "x": 2.5,
        "y": 16.93,
        "w": 95.0,
        "h": 29.06
      },
      {
        "label": "ระเบียงทางเดิน",
        "x": 8.25,
        "y": 3.0,
        "w": 86.6,
        "h": 14.21
      }
    ]
  },
  "scenes": [
    {
      "id": "p048",
      "title": "โซนวิถีชีวิตและเครื่องใช้พื้นบ้าน (1)",
      "description": "เครื่องมือเครื่องใช้พื้นบ้าน หูก กี่ทอผ้า และบอร์ดนิทรรศการพุทธศิลป์",
      "image": "images/panoramas/p048.jpg",
      "map": {
        "x": 4.37,
        "y": 37.48
      },
      "northOffset": 101.3,
      "links": [
        {
          "to": "p060"
        },
        {
          "to": "p053"
        },
        {
          "to": "p069"
        }
      ],
      "infos": [
        {
          "yaw": 89.4,
          "pitch": -5.9,
          "artwork": "a03",
          "title": "ภาพประดิษฐ์ “ตุงผ้าทอสายใยผูกพัน”",
          "subtitle": "Drawing Image – woven tung",
          "card": "images/artworks/a03.jpg"
        }
      ]
    },
    {
      "id": "p053",
      "title": "โซนวิถีชีวิตและเครื่องใช้พื้นบ้าน (2)",
      "description": "เครื่องมือเครื่องใช้พื้นบ้าน หูก กี่ทอผ้า และบอร์ดนิทรรศการพุทธศิลป์",
      "image": "images/panoramas/p053.jpg",
      "map": {
        "x": 4.0,
        "y": 25.39
      },
      "northOffset": 90.4,
      "links": [
        {
          "to": "p060"
        }
      ],
      "infos": [
        {
          "yaw": 60.3,
          "pitch": -16.8,
          "artwork": "a03",
          "title": "ภาพประดิษฐ์ “ตุงผ้าทอสายใยผูกพัน”",
          "subtitle": "Drawing Image – woven tung",
          "card": "images/artworks/a03.jpg"
        }
      ]
    },
    {
      "id": "p060",
      "title": "โซนวิถีชีวิตและเครื่องใช้พื้นบ้าน (3)",
      "description": "เครื่องมือเครื่องใช้พื้นบ้าน หูก กี่ทอผ้า และบอร์ดนิทรรศการพุทธศิลป์",
      "image": "images/panoramas/p060.jpg",
      "map": {
        "x": 13.93,
        "y": 36.17
      },
      "northOffset": 86.3,
      "links": [],
      "infos": [
        {
          "yaw": -142.9,
          "pitch": 2.3,
          "artwork": "a04",
          "title": "ตุง ภาพประดิษฐ์ “ตุงวิถีวัฒนธรรมล้านนา”",
          "subtitle": "Lanna cultural in Tung",
          "card": "images/artworks/a04.jpg"
        },
        {
          "yaw": -25,
          "pitch": -3,
          "artwork": "a33",
          "title": "เครื่องปั่นฝ้าย",
          "subtitle": "Cotton Jin",
          "card": "images/artworks/a33.jpg"
        },
        {
          "yaw": -86,
          "pitch": -13,
          "artwork": "a55",
          "title": "หีบเหล็กโบราณ",
          "subtitle": "Ancient iron chest",
          "card": "images/artworks/a55.jpg"
        },
        {
          "yaw": 59,
          "pitch": -17,
          "artwork": "a56",
          "title": "ขันโตกแบน",
          "subtitle": "Khantoke",
          "card": "images/artworks/a56.jpg"
        }
      ]
    },
    {
      "id": "p069",
      "title": "โซนจิตรกรรมร่วมสมัย (1)",
      "description": "ภาพจิตรกรรมพุทธศิลป์ร่วมสมัยและมุมสักการะรูปเหมือนพระเถระ",
      "image": "images/panoramas/p069.jpg",
      "map": {
        "x": 24.68,
        "y": 43.5
      },
      "northOffset": -174.0,
      "links": [
        {
          "to": "p072"
        },
        {
          "to": "p080"
        },
        {
          "to": "p089"
        }
      ],
      "infos": []
    },
    {
      "id": "p072",
      "title": "โซนจิตรกรรมร่วมสมัย (2)",
      "description": "ภาพจิตรกรรมพุทธศิลป์ร่วมสมัยและมุมสักการะรูปเหมือนพระเถระ",
      "image": "images/panoramas/p072.jpg",
      "map": {
        "x": 23.93,
        "y": 32.95
      },
      "northOffset": 83.0,
      "links": [
        {
          "to": "p080"
        },
        {
          "to": "p075"
        }
      ],
      "infos": [
        {
          "yaw": -102.2,
          "pitch": 2.8,
          "artwork": "a04",
          "title": "ตุง ภาพประดิษฐ์ “ตุงวิถีวัฒนธรรมล้านนา”",
          "subtitle": "Lanna cultural in Tung",
          "card": "images/artworks/a04.jpg"
        },
        {
          "yaw": -5,
          "pitch": 2,
          "artwork": "a58",
          "title": "รูปปั้นพระมหาโพธิวงศาจารย์",
          "subtitle": "Phramaha Bhodhiwongsajarn Statue",
          "card": "images/artworks/a58.jpg"
        }
      ]
    },
    {
      "id": "p075",
      "title": "โซนจิตรกรรมร่วมสมัย (3)",
      "description": "ภาพจิตรกรรมพุทธศิลป์ร่วมสมัยและมุมสักการะรูปเหมือนพระเถระ",
      "image": "images/panoramas/p075.jpg",
      "map": {
        "x": 32.07,
        "y": 22.89
      },
      "northOffset": -175.0,
      "links": [
        {
          "to": "p080"
        },
        {
          "to": "p096"
        },
        {
          "to": "p116"
        }
      ],
      "infos": []
    },
    {
      "id": "p080",
      "title": "โซนจิตรกรรมร่วมสมัย (4)",
      "description": "ภาพจิตรกรรมพุทธศิลป์ร่วมสมัยและมุมสักการะรูปเหมือนพระเถระ",
      "image": "images/panoramas/p080.jpg",
      "map": {
        "x": 32.46,
        "y": 32.88
      },
      "northOffset": 94.2,
      "links": [
        {
          "to": "p096"
        },
        {
          "to": "p089"
        }
      ],
      "infos": [
        {
          "yaw": -61.7,
          "pitch": 2.6,
          "artwork": "a04",
          "title": "ตุง ภาพประดิษฐ์ “ตุงวิถีวัฒนธรรมล้านนา”",
          "subtitle": "Lanna cultural in Tung",
          "card": "images/artworks/a04.jpg"
        },
        {
          "yaw": -107.6,
          "pitch": 0.9,
          "artwork": "a05",
          "title": "ภาพประดิษฐ์ “พระกาฬ”",
          "subtitle": "",
          "card": "images/artworks/a05.jpg"
        }
      ]
    },
    {
      "id": "p089",
      "title": "โซนจิตรกรรมร่วมสมัย (5)",
      "description": "ภาพจิตรกรรมพุทธศิลป์ร่วมสมัยและมุมสักการะรูปเหมือนพระเถระ",
      "image": "images/panoramas/p089.jpg",
      "map": {
        "x": 38.52,
        "y": 44.49
      },
      "northOffset": 6.1,
      "links": [
        {
          "to": "p122"
        },
        {
          "to": "p096"
        }
      ],
      "infos": []
    },
    {
      "id": "p096",
      "title": "โซนคัมภีร์และเครื่องสักการะ (1)",
      "description": "คัมภีร์โบราณ เครื่องสักการะ และงานจิตรกรรมบนแผ่นไม้",
      "image": "images/panoramas/p096.jpg",
      "map": {
        "x": 41.28,
        "y": 28.14
      },
      "northOffset": -0.1,
      "links": [
        {
          "to": "p116"
        },
        {
          "to": "p122"
        },
        {
          "to": "p136"
        }
      ],
      "infos": [
        {
          "yaw": 100,
          "pitch": -15,
          "artwork": "a10",
          "title": "แผ่นยันต์",
          "subtitle": "talisman or fabric",
          "card": "images/artworks/a10.jpg"
        },
        {
          "yaw": 152,
          "pitch": -8,
          "artwork": "a61",
          "title": "เครื่องสูงบูชาพระเจ้าห้าพระองค์",
          "subtitle": "The Highest for Buja",
          "card": "images/artworks/a61.jpg"
        }
      ]
    },
    {
      "id": "p116",
      "title": "โซนคัมภีร์และเครื่องสักการะ (2)",
      "description": "คัมภีร์โบราณ เครื่องสักการะ และงานจิตรกรรมบนแผ่นไม้",
      "image": "images/panoramas/p116.jpg",
      "map": {
        "x": 46.7,
        "y": 18.43
      },
      "northOffset": 1.3,
      "links": [
        {
          "to": "p143"
        }
      ],
      "infos": []
    },
    {
      "id": "p122",
      "title": "โซนคัมภีร์และเครื่องสักการะ (3)",
      "description": "คัมภีร์โบราณ เครื่องสักการะ และงานจิตรกรรมบนแผ่นไม้",
      "image": "images/panoramas/p122.jpg",
      "map": {
        "x": 51.63,
        "y": 38.49
      },
      "northOffset": -1.1,
      "links": [
        {
          "to": "p128"
        },
        {
          "to": "p136"
        }
      ],
      "infos": [
        {
          "yaw": -149.5,
          "pitch": -3.0,
          "artwork": "a06",
          "title": "ภาพประดิษฐ์ “ตุงสื่อชีวิตและจิตวิญญาณ”",
          "subtitle": "life and spiritual in Tung",
          "card": "images/artworks/a06.jpg"
        },
        {
          "yaw": -40,
          "pitch": -15,
          "artwork": "a09",
          "title": "ไส้เทียนบูชาพระ",
          "subtitle": "Candlewick",
          "card": "images/artworks/a09.jpg"
        },
        {
          "yaw": 12,
          "pitch": -15,
          "artwork": "a11",
          "title": "สมุดข่อย",
          "subtitle": "Note Book",
          "card": "images/artworks/a11.jpg"
        },
        {
          "yaw": 37,
          "pitch": -11,
          "artwork": "a14",
          "title": "พระธาตุช่อแฮจำลอง",
          "subtitle": "Chohae Pagoda Model",
          "card": "images/artworks/a14.jpg"
        },
        {
          "yaw": 45,
          "pitch": -2,
          "artwork": "a21",
          "title": "พระประจำวันเกิดวันเสาร์ พระปางนาคปรก",
          "subtitle": "Saturday Buddha Image",
          "card": "images/artworks/a21.jpg"
        },
        {
          "yaw": -61,
          "pitch": -7,
          "artwork": "a32",
          "title": "พระเจ้าศรีมหาโพธิ์",
          "subtitle": "Sri Maha Pho Buddha Image",
          "card": "images/artworks/a32.jpg"
        },
        {
          "yaw": 164,
          "pitch": -2,
          "artwork": "a61",
          "title": "เครื่องสูงบูชาพระเจ้าห้าพระองค์",
          "subtitle": "The Highest for Buja",
          "card": "images/artworks/a61.jpg"
        }
      ]
    },
    {
      "id": "p128",
      "title": "โซนคัมภีร์และเครื่องสักการะ (4)",
      "description": "คัมภีร์โบราณ เครื่องสักการะ และงานจิตรกรรมบนแผ่นไม้",
      "image": "images/panoramas/p128.jpg",
      "map": {
        "x": 61.36,
        "y": 42.62
      },
      "northOffset": 8.6,
      "links": [
        {
          "to": "p151"
        },
        {
          "to": "p136"
        }
      ],
      "infos": []
    },
    {
      "id": "p136",
      "title": "โซนพระพุทธรูป (1)",
      "description": "พระพุทธรูปหลากหลายพุทธลักษณะที่จัดแสดงบนแท่นไม้",
      "image": "images/panoramas/p136.jpg",
      "map": {
        "x": 62.43,
        "y": 27.49
      },
      "northOffset": 9.7,
      "links": [
        {
          "to": "p143"
        },
        {
          "to": "p151"
        }
      ],
      "infos": [
        {
          "yaw": -173.7,
          "pitch": -16.9,
          "artwork": "a22",
          "title": "พระพุทธรูปประจำวันเกิดวันพฤหัสบดี พระปางตรัสรู้หรือปางสมาธิ",
          "subtitle": "Thursday Buddha Image",
          "card": "images/artworks/a22.jpg"
        }
      ]
    },
    {
      "id": "p143",
      "title": "โซนพระพุทธรูป (2)",
      "description": "พระพุทธรูปหลากหลายพุทธลักษณะที่จัดแสดงบนแท่นไม้",
      "image": "images/panoramas/p143.jpg",
      "map": {
        "x": 64.95,
        "y": 21.88
      },
      "northOffset": -11.3,
      "links": [
        {
          "to": "p145"
        }
      ],
      "infos": [
        {
          "yaw": 177.3,
          "pitch": -6.8,
          "artwork": "a23",
          "title": "พระประจำวันเกิดวันศุกร์ พระปางรำพึง",
          "subtitle": "Friday Buddha Image",
          "card": "images/artworks/a23.jpg"
        }
      ]
    },
    {
      "id": "p145",
      "title": "โซนพระพุทธรูป (3)",
      "description": "พระพุทธรูปหลากหลายพุทธลักษณะที่จัดแสดงบนแท่นไม้",
      "image": "images/panoramas/p145.jpg",
      "map": {
        "x": 69.76,
        "y": 21.93
      },
      "northOffset": -2.2,
      "links": [
        {
          "to": "p158"
        },
        {
          "to": "p151"
        }
      ],
      "infos": [
        {
          "yaw": -0.5,
          "pitch": -21.1,
          "artwork": "a02",
          "title": "ภาพวาดสีน้ำมัน “ท่ามกลางความสงบในอนธกาล”",
          "subtitle": "Painting",
          "card": "images/artworks/a02.jpg"
        },
        {
          "yaw": -169,
          "pitch": -11,
          "artwork": "a12",
          "title": "พระประจำวันเกิดวันอังคารปางไสยาสน์",
          "subtitle": "Tuesday Buddha Image",
          "card": "images/artworks/a12.jpg"
        }
      ]
    },
    {
      "id": "p151",
      "title": "โซนพระพุทธรูป (4)",
      "description": "พระพุทธรูปหลากหลายพุทธลักษณะที่จัดแสดงบนแท่นไม้",
      "image": "images/panoramas/p151.jpg",
      "map": {
        "x": 69.33,
        "y": 35.23
      },
      "northOffset": 5.8,
      "links": [
        {
          "to": "p158"
        }
      ],
      "infos": [
        {
          "yaw": -140.8,
          "pitch": -3.4,
          "artwork": "a07",
          "title": "ภาพประดิษฐ์ “มนตราแห่งเลขยันต์”",
          "subtitle": "Artificial image “Montra of the number”",
          "card": "images/artworks/a07.jpg"
        },
        {
          "yaw": 59,
          "pitch": -14,
          "artwork": "a65",
          "title": "เจดีย์บรรจุพระสารีริกธาตุ",
          "subtitle": "The stupa of relic of The Lord Buddha",
          "card": "images/artworks/a65.jpg"
        }
      ]
    },
    {
      "id": "p158",
      "title": "โซนธรรมาสน์และบุษบก (1)",
      "description": "ธรรมาสน์ บุษบก สัปทน และเครื่องประกอบพิธีกรรมทางพุทธศาสนา",
      "image": "images/panoramas/p158.jpg",
      "map": {
        "x": 78.05,
        "y": 31.97
      },
      "northOffset": -88.3,
      "links": [
        {
          "to": "p177"
        }
      ],
      "infos": [
        {
          "yaw": -91.9,
          "pitch": 3.0,
          "artwork": "a01",
          "title": "ภาพประดิษฐ์สื่อผสม “สายลมแห่งโลกธรรม”",
          "subtitle": "Painting",
          "card": "images/artworks/a01.jpg"
        },
        {
          "yaw": -115.3,
          "pitch": -6.5,
          "artwork": "a02",
          "title": "ภาพวาดสีน้ำมัน “ท่ามกลางความสงบในอนธกาล”",
          "subtitle": "Painting",
          "card": "images/artworks/a02.jpg"
        },
        {
          "yaw": 124,
          "pitch": -5,
          "artwork": "a62",
          "title": "ตู้พระไตรปิฎก",
          "subtitle": "the tripitaka cabinet",
          "card": "images/artworks/a62.jpg"
        },
        {
          "yaw": 65,
          "pitch": -8,
          "artwork": "a63",
          "title": "ธรรมาสน์",
          "subtitle": "seat of sermon, sermon seat",
          "card": "images/artworks/a63.jpg"
        },
        {
          "yaw": 94,
          "pitch": -8,
          "artwork": "a64",
          "title": "ธรรมาสน์",
          "subtitle": "seat of sermon, sermon seat",
          "card": "images/artworks/a64.jpg"
        }
      ]
    },
    {
      "id": "p177",
      "title": "โซนธรรมาสน์และบุษบก (2)",
      "description": "ธรรมาสน์ บุษบก สัปทน และเครื่องประกอบพิธีกรรมทางพุทธศาสนา",
      "image": "images/panoramas/p177.jpg",
      "map": {
        "x": 84.71,
        "y": 31.49
      },
      "northOffset": -82.1,
      "links": [
        {
          "to": "p194"
        }
      ],
      "infos": [
        {
          "yaw": -108.2,
          "pitch": 2.8,
          "artwork": "a01",
          "title": "ภาพประดิษฐ์สื่อผสม “สายลมแห่งโลกธรรม”",
          "subtitle": "Painting",
          "card": "images/artworks/a01.jpg"
        },
        {
          "yaw": 90,
          "pitch": -8,
          "artwork": "a63",
          "title": "ธรรมาสน์",
          "subtitle": "seat of sermon, sermon seat",
          "card": "images/artworks/a63.jpg"
        },
        {
          "yaw": 122,
          "pitch": -8,
          "artwork": "a64",
          "title": "ธรรมาสน์",
          "subtitle": "seat of sermon, sermon seat",
          "card": "images/artworks/a64.jpg"
        },
        {
          "yaw": 53,
          "pitch": -24,
          "artwork": "a68",
          "title": "อูปยอด",
          "subtitle": "Upp",
          "card": "images/artworks/a68.jpg"
        }
      ]
    },
    {
      "id": "p183",
      "title": "พระพุทธรูปประธาน",
      "description": "พระพุทธรูปประทับนั่งพร้อมเครื่องสักการะ และจิตรกรรมพื้นหลัง",
      "image": "images/panoramas/p183.jpg",
      "map": {
        "x": 96.0,
        "y": 39.89
      },
      "northOffset": 2.2,
      "links": [
        {
          "to": "p194"
        }
      ],
      "infos": [
        {
          "yaw": -178.8,
          "pitch": -1.2,
          "artwork": "a67",
          "title": "ปูรณฆฏะ หรือ กุมภะ",
          "subtitle": "Puranakata or Kumar",
          "card": "images/artworks/a67.jpg"
        },
        {
          "yaw": -110,
          "pitch": 5,
          "artwork": "a69",
          "title": "เครื่องสูงประกอบยศ",
          "subtitle": "High-ranking decoration",
          "card": "images/artworks/a69.jpg"
        }
      ]
    },
    {
      "id": "p194",
      "title": "มุมแผงพระพิมพ์",
      "description": "แผงพระพิมพ์ที่ประดิษฐานพระพุทธรูปองค์เล็กจำนวนมาก ใกล้ประตูทางออก",
      "image": "images/panoramas/p194.jpg",
      "map": {
        "x": 94.61,
        "y": 20.86
      },
      "northOffset": 9.2,
      "links": [
        {
          "to": "p195"
        }
      ],
      "infos": [
        {
          "yaw": 92.4,
          "pitch": -4.6,
          "artwork": "a70",
          "title": "พระแผงเนื้อดิน",
          "subtitle": "The Soil Buddha Image in Panel Board",
          "card": "images/artworks/a70.jpg"
        }
      ]
    },
    {
      "id": "p195",
      "title": "ประตูหอพุทธศิลป์",
      "description": "ประตูเชื่อมระหว่างห้องจัดแสดงกับระเบียงด้านนอก",
      "image": "images/panoramas/p195.jpg",
      "map": {
        "x": 93.85,
        "y": 7.45
      },
      "northOffset": 4.6,
      "links": [
        {
          "to": "p201"
        }
      ],
      "infos": []
    },
    {
      "id": "p201",
      "title": "ระเบียงทางเดิน (1)",
      "description": "ระเบียงทางเดินด้านนอกเลียบหอพุทธศิลป์",
      "image": "images/panoramas/p201.jpg",
      "map": {
        "x": 74.27,
        "y": 6.18
      },
      "northOffset": -179.7,
      "links": [
        {
          "to": "p203"
        }
      ],
      "infos": []
    },
    {
      "id": "p203",
      "title": "ระเบียงทางเดิน (2)",
      "description": "ระเบียงทางเดินด้านนอกเลียบหอพุทธศิลป์",
      "image": "images/panoramas/p203.jpg",
      "map": {
        "x": 60.85,
        "y": 5.57
      },
      "northOffset": 179.5,
      "links": [
        {
          "to": "p206"
        }
      ],
      "infos": []
    },
    {
      "id": "p206",
      "title": "ระเบียงทางเดิน (3)",
      "description": "ระเบียงทางเดินด้านนอกเลียบหอพุทธศิลป์",
      "image": "images/panoramas/p206.jpg",
      "map": {
        "x": 47.42,
        "y": 5.16
      },
      "northOffset": 179.1,
      "links": [
        {
          "to": "p210"
        }
      ],
      "infos": []
    },
    {
      "id": "p210",
      "title": "ระเบียงทางเดิน (4)",
      "description": "ระเบียงทางเดินด้านนอกเลียบหอพุทธศิลป์",
      "image": "images/panoramas/p210.jpg",
      "map": {
        "x": 33.99,
        "y": 4.68
      },
      "northOffset": -179.8,
      "links": [
        {
          "to": "p212"
        }
      ],
      "infos": []
    },
    {
      "id": "p212",
      "title": "ระเบียงทางเดิน (5)",
      "description": "ระเบียงทางเดินด้านนอกเลียบหอพุทธศิลป์",
      "image": "images/panoramas/p212.jpg",
      "map": {
        "x": 20.56,
        "y": 4.31
      },
      "northOffset": 179.8,
      "links": [
        {
          "to": "p220"
        },
        {
          "to": "p215"
        }
      ],
      "infos": []
    },
    {
      "id": "p215",
      "title": "ลานหน้าอาคาร",
      "description": "ลานโล่งหน้าทางเข้าหอพุทธศิลป์",
      "image": "images/panoramas/p215.jpg",
      "map": {
        "x": 9.25,
        "y": 16.21
      },
      "northOffset": -177.5,
      "links": [
        {
          "to": "p220"
        }
      ],
      "infos": []
    },
    {
      "id": "p220",
      "title": "ทางเข้าหอพุทธศิลป์",
      "description": "ประตูทางเข้าหอพุทธศิลป์ มจร วิทยาเขตแพร่",
      "image": "images/panoramas/p220.jpg",
      "map": {
        "x": 10.6,
        "y": 4.0
      },
      "northOffset": 166.6,
      "links": [],
      "infos": []
    }
  ],
  "artworks": [
    {
      "id": "a01",
      "card_no": 1,
      "title": "ภาพประดิษฐ์สื่อผสม “สายลมแห่งโลกธรรม”",
      "title_en": "Painting",
      "card": "images/artworks/a01.jpg",
      "placements": [
        {
          "pano": "158",
          "yaw": -91.9,
          "pitch": 3.0
        },
        {
          "pano": "177",
          "yaw": -108.2,
          "pitch": 2.8
        }
      ]
    },
    {
      "id": "a02",
      "card_no": 2,
      "title": "ภาพวาดสีน้ำมัน “ท่ามกลางความสงบในอนธกาล”",
      "title_en": "Painting",
      "card": "images/artworks/a02.jpg",
      "placements": [
        {
          "pano": "145",
          "yaw": -0.5,
          "pitch": -21.1
        },
        {
          "pano": "158",
          "yaw": -115.3,
          "pitch": -6.5
        }
      ]
    },
    {
      "id": "a03",
      "card_no": 3,
      "title": "ภาพประดิษฐ์ “ตุงผ้าทอสายใยผูกพัน”",
      "title_en": "Drawing Image – woven tung",
      "card": "images/artworks/a03.jpg",
      "placements": [
        {
          "pano": "053",
          "yaw": 60.3,
          "pitch": -16.8
        },
        {
          "pano": "048",
          "yaw": 89.4,
          "pitch": -5.9
        }
      ]
    },
    {
      "id": "a04",
      "card_no": 4,
      "title": "ตุง ภาพประดิษฐ์ “ตุงวิถีวัฒนธรรมล้านนา”",
      "title_en": "Lanna cultural in Tung",
      "card": "images/artworks/a04.jpg",
      "placements": [
        {
          "pano": "080",
          "yaw": -61.7,
          "pitch": 2.6
        },
        {
          "pano": "072",
          "yaw": -102.2,
          "pitch": 2.8
        },
        {
          "pano": "060",
          "yaw": -142.9,
          "pitch": 2.3
        }
      ]
    },
    {
      "id": "a05",
      "card_no": 5,
      "title": "ภาพประดิษฐ์ “พระกาฬ”",
      "title_en": "",
      "card": "images/artworks/a05.jpg",
      "placements": [
        {
          "pano": "080",
          "yaw": -107.6,
          "pitch": 0.9
        }
      ]
    },
    {
      "id": "a06",
      "card_no": 6,
      "title": "ภาพประดิษฐ์ “ตุงสื่อชีวิตและจิตวิญญาณ”",
      "title_en": "life and spiritual in Tung",
      "card": "images/artworks/a06.jpg",
      "placements": [
        {
          "pano": "122",
          "yaw": -149.5,
          "pitch": -3.0
        }
      ]
    },
    {
      "id": "a07",
      "card_no": 7,
      "title": "ภาพประดิษฐ์ “มนตราแห่งเลขยันต์”",
      "title_en": "Artificial image “Montra of the number”",
      "card": "images/artworks/a07.jpg",
      "placements": [
        {
          "pano": "151",
          "yaw": -140.8,
          "pitch": -3.4
        }
      ]
    },
    {
      "id": "a08",
      "card_no": 8,
      "title": "เครื่องสูงบูชาพระเจ้าห้าพระองค์",
      "title_en": "The Highest Worshiping",
      "card": "images/artworks/a08.jpg",
      "placements": []
    },
    {
      "id": "a09",
      "card_no": 9,
      "title": "ไส้เทียนบูชาพระ",
      "title_en": "Candlewick",
      "card": "images/artworks/a09.jpg",
      "placements": [
        {
          "pano": "122",
          "yaw": -40,
          "pitch": -15
        }
      ]
    },
    {
      "id": "a10",
      "card_no": 10,
      "title": "แผ่นยันต์",
      "title_en": "talisman or fabric",
      "card": "images/artworks/a10.jpg",
      "placements": [
        {
          "pano": "096",
          "yaw": 100,
          "pitch": -15
        }
      ]
    },
    {
      "id": "a11",
      "card_no": 11,
      "title": "สมุดข่อย",
      "title_en": "Note Book",
      "card": "images/artworks/a11.jpg",
      "placements": [
        {
          "pano": "122",
          "yaw": 12,
          "pitch": -15
        }
      ]
    },
    {
      "id": "a12",
      "card_no": 12,
      "title": "พระประจำวันเกิดวันอังคารปางไสยาสน์",
      "title_en": "Tuesday Buddha Image",
      "card": "images/artworks/a12.jpg",
      "placements": [
        {
          "pano": "145",
          "yaw": -169,
          "pitch": -11
        }
      ]
    },
    {
      "id": "a13",
      "card_no": 13,
      "title": "พระพุทธรูปปางมารวิชัย",
      "title_en": "Maravichaya Buddha Image Style",
      "card": "images/artworks/a13.jpg",
      "placements": []
    },
    {
      "id": "a14",
      "card_no": 14,
      "title": "พระธาตุช่อแฮจำลอง",
      "title_en": "Chohae Pagoda Model",
      "card": "images/artworks/a14.jpg",
      "placements": [
        {
          "pano": "122",
          "yaw": 37,
          "pitch": -11
        }
      ]
    },
    {
      "id": "a15",
      "card_no": 15,
      "title": "พระพุทธรูปปางมารวิชัย",
      "title_en": "Maravichaya Buddha Image Style",
      "card": "images/artworks/a15.jpg",
      "placements": []
    },
    {
      "id": "a16",
      "card_no": 16,
      "title": "พระพุทธรูปปางมารวิชัย",
      "title_en": "Maravichaya Buddha Image Style",
      "card": "images/artworks/a16.jpg",
      "placements": []
    },
    {
      "id": "a17",
      "card_no": 17,
      "title": "พระพุทธรูปปางมารวิชัย",
      "title_en": "Maravichaya Buddha Image Style",
      "card": "images/artworks/a17.jpg",
      "placements": []
    },
    {
      "id": "a18",
      "card_no": 18,
      "title": "พระประจำวันเกิดวันอาทิตย์ปางถวายเนตรแกะสลักไม้",
      "title_en": "Saturday Wooden Buddha Image",
      "card": "images/artworks/a18.jpg",
      "placements": []
    },
    {
      "id": "a19",
      "card_no": 19,
      "title": "พระพุทธรูปปางห้ามแก่นจันทร์",
      "title_en": "Buddha Image",
      "card": "images/artworks/a19.jpg",
      "placements": []
    },
    {
      "id": "a20",
      "card_no": 20,
      "title": "พระประจำวันเกิดวันพุธ กลางวัน พระปางอุ้มบาตร",
      "title_en": "Wednesday Buddha Image",
      "card": "images/artworks/a20.jpg",
      "placements": []
    },
    {
      "id": "a21",
      "card_no": 21,
      "title": "พระประจำวันเกิดวันเสาร์ พระปางนาคปรก",
      "title_en": "Saturday Buddha Image",
      "card": "images/artworks/a21.jpg",
      "placements": [
        {
          "pano": "122",
          "yaw": 45,
          "pitch": -2
        }
      ]
    },
    {
      "id": "a22",
      "card_no": 22,
      "title": "พระพุทธรูปประจำวันเกิดวันพฤหัสบดี พระปางตรัสรู้หรือปางสมาธิ",
      "title_en": "Thursday Buddha Image",
      "card": "images/artworks/a22.jpg",
      "placements": [
        {
          "pano": "136",
          "yaw": -173.7,
          "pitch": -16.9
        }
      ]
    },
    {
      "id": "a23",
      "card_no": 23,
      "title": "พระประจำวันเกิดวันศุกร์ พระปางรำพึง",
      "title_en": "Friday Buddha Image",
      "card": "images/artworks/a23.jpg",
      "placements": [
        {
          "pano": "143",
          "yaw": 177.3,
          "pitch": -6.8
        }
      ]
    },
    {
      "id": "a24",
      "card_no": 24,
      "title": "พระประจำวันเกิดวันพุธ (ราหู) ปางป่าเลไลย์",
      "title_en": "Wednesday Night Buddha Image (Sitting Style)",
      "card": "images/artworks/a24.jpg",
      "placements": []
    },
    {
      "id": "a25",
      "card_no": 25,
      "title": "พระประจำวันเกิดวันพุธกลางคืน",
      "title_en": "Wednesday Night Buddha Image (Sitting Style)",
      "card": "images/artworks/a25.jpg",
      "placements": []
    },
    {
      "id": "a26",
      "card_no": 26,
      "title": "สุ่มดอกล้านนา",
      "title_en": "Lanna flower Bowl",
      "card": "images/artworks/a26.jpg",
      "placements": []
    },
    {
      "id": "a27",
      "card_no": 27,
      "title": "ก้างธรรม",
      "title_en": "Dhamma Script Hanger",
      "card": "images/artworks/a27.jpg",
      "placements": []
    },
    {
      "id": "a28",
      "card_no": 28,
      "title": "ปั๊บสา (สมุดข่อย)",
      "title_en": "Note Book",
      "card": "images/artworks/a28.jpg",
      "placements": []
    },
    {
      "id": "a29",
      "card_no": 29,
      "title": "หม้อดินเผา",
      "title_en": "Clay pot",
      "card": "images/artworks/a29.jpg",
      "placements": []
    },
    {
      "id": "a30",
      "card_no": 30,
      "title": "รูปปั้นหรือรูปหล่อพิมพ์เกจิอาจารย์",
      "title_en": "Simulate of Monks",
      "card": "images/artworks/a30.jpg",
      "placements": []
    },
    {
      "id": "a31",
      "card_no": 31,
      "title": "เจดีย์จำลอง",
      "title_en": "Simulate Pagoda",
      "card": "images/artworks/a31.jpg",
      "placements": []
    },
    {
      "id": "a32",
      "card_no": 32,
      "title": "พระเจ้าศรีมหาโพธิ์",
      "title_en": "Sri Maha Pho Buddha Image",
      "card": "images/artworks/a32.jpg",
      "placements": [
        {
          "pano": "122",
          "yaw": -61,
          "pitch": -7
        }
      ]
    },
    {
      "id": "a33",
      "card_no": 33,
      "title": "เครื่องปั่นฝ้าย",
      "title_en": "Cotton Jin",
      "card": "images/artworks/a33.jpg",
      "placements": [
        {
          "pano": "060",
          "yaw": -25,
          "pitch": -3
        }
      ]
    },
    {
      "id": "a34",
      "card_no": 34,
      "title": "เปียทอผ้า",
      "title_en": "Braid weaving",
      "card": "images/artworks/a34.jpg",
      "placements": []
    },
    {
      "id": "a35",
      "card_no": 35,
      "title": "ฟืมทอผ้า",
      "title_en": "Feum weaving",
      "card": "images/artworks/a35.jpg",
      "placements": []
    },
    {
      "id": "a36",
      "card_no": 36,
      "title": "เครื่องเสียงโบราณและแผ่นเสียง",
      "title_en": "Antique audio and Recording plate",
      "card": "images/artworks/a36.jpg",
      "placements": []
    },
    {
      "id": "a37",
      "card_no": 37,
      "title": "ฮอก",
      "title_en": "Wooden bell",
      "card": "images/artworks/a37.jpg",
      "placements": []
    },
    {
      "id": "a38",
      "card_no": 38,
      "title": "ขันพานทองเหลือง",
      "title_en": "Brass bowl",
      "card": "images/artworks/a38.jpg",
      "placements": []
    },
    {
      "id": "a39",
      "card_no": 39,
      "title": "ขันพานทองเหลือง",
      "title_en": "Brass bowl",
      "card": "images/artworks/a39.jpg",
      "placements": []
    },
    {
      "id": "a40",
      "card_no": 40,
      "title": "ตลับเมตรโบราณ",
      "title_en": "Antique meter",
      "card": "images/artworks/a40.jpg",
      "placements": []
    },
    {
      "id": "a41",
      "card_no": 41,
      "title": "กระบอกชงชา",
      "title_en": "Tea maker",
      "card": "images/artworks/a41.jpg",
      "placements": []
    },
    {
      "id": "a42",
      "card_no": 42,
      "title": "ถาดทองเหลืองก้นลึก",
      "title_en": "Brass tray",
      "card": "images/artworks/a42.jpg",
      "placements": []
    },
    {
      "id": "a43",
      "card_no": 43,
      "title": "ครอบกำยาน",
      "title_en": "frankincense Covering",
      "card": "images/artworks/a43.jpg",
      "placements": []
    },
    {
      "id": "a44",
      "card_no": 44,
      "title": "เด็งหรือกระดิ่ง",
      "title_en": "Bell",
      "card": "images/artworks/a44.jpg",
      "placements": []
    },
    {
      "id": "a45",
      "card_no": 45,
      "title": "ขันหมากและเครื่องเขินล้านนา",
      "title_en": "Lanna Lacquer ware",
      "card": "images/artworks/a45.jpg",
      "placements": []
    },
    {
      "id": "a46",
      "card_no": 46,
      "title": "ขันหมากและเครื่องเขินล้านนา",
      "title_en": "Lanna Lacquer ware",
      "card": "images/artworks/a46.jpg",
      "placements": []
    },
    {
      "id": "a47",
      "card_no": 47,
      "title": "ขันหมากและเครื่องเขินล้านนา",
      "title_en": "Lanna Lacquer ware",
      "card": "images/artworks/a47.jpg",
      "placements": []
    },
    {
      "id": "a48",
      "card_no": 48,
      "title": "ขันหมากและเครื่องเขินล้านนา",
      "title_en": "Lanna Lacquer ware",
      "card": "images/artworks/a48.jpg",
      "placements": []
    },
    {
      "id": "a49",
      "card_no": 49,
      "title": "ทองเหลือง",
      "title_en": "Brass bowl",
      "card": "images/artworks/a49.jpg",
      "placements": []
    },
    {
      "id": "a50",
      "card_no": 50,
      "title": "น้ำถุ้ง",
      "title_en": "Water Scoop",
      "card": "images/artworks/a50.jpg",
      "placements": []
    },
    {
      "id": "a51",
      "card_no": 51,
      "title": "หมอนไม้ หรือ หมอนนมสาว",
      "title_en": "Wooden Pillow",
      "card": "images/artworks/a51.jpg",
      "placements": []
    },
    {
      "id": "a52",
      "card_no": 52,
      "title": "ถาดร่อนทองคำ",
      "title_en": "Gold pan tray",
      "card": "images/artworks/a52.jpg",
      "placements": []
    },
    {
      "id": "a53",
      "card_no": 53,
      "title": "แร้วคอม้า (กับดักคอม้า)",
      "title_en": "Horse Snare",
      "card": "images/artworks/a53.jpg",
      "placements": []
    },
    {
      "id": "a54",
      "card_no": 54,
      "title": "ม้าหั่นใบยาสูบ",
      "title_en": "tobacco turning",
      "card": "images/artworks/a54.jpg",
      "placements": []
    },
    {
      "id": "a55",
      "card_no": 55,
      "title": "หีบเหล็กโบราณ",
      "title_en": "Ancient iron chest",
      "card": "images/artworks/a55.jpg",
      "placements": [
        {
          "pano": "060",
          "yaw": -86,
          "pitch": -13
        }
      ]
    },
    {
      "id": "a56",
      "card_no": 56,
      "title": "ขันโตกแบน",
      "title_en": "Khantoke",
      "card": "images/artworks/a56.jpg",
      "placements": [
        {
          "pano": "060",
          "yaw": 59,
          "pitch": -17
        }
      ]
    },
    {
      "id": "a57",
      "card_no": 57,
      "title": "ขันหมากเครื่องเขินล้านนา",
      "title_en": "Lanna Lacquer ware",
      "card": "images/artworks/a57.jpg",
      "placements": []
    },
    {
      "id": "a58",
      "card_no": 58,
      "title": "รูปปั้นพระมหาโพธิวงศาจารย์",
      "title_en": "Phramaha Bhodhiwongsajarn Statue",
      "card": "images/artworks/a58.jpg",
      "placements": [
        {
          "pano": "072",
          "yaw": -5,
          "pitch": 2
        }
      ]
    },
    {
      "id": "a59",
      "card_no": 59,
      "title": "เครื่องเคลือบดินเผา",
      "title_en": "Porcelain",
      "card": "images/artworks/a59.jpg",
      "placements": []
    },
    {
      "id": "a60",
      "card_no": 60,
      "title": "พระบูชา",
      "title_en": "Worshiping Buddha image",
      "card": "images/artworks/a60.jpg",
      "placements": []
    },
    {
      "id": "a61",
      "card_no": 61,
      "title": "เครื่องสูงบูชาพระเจ้าห้าพระองค์",
      "title_en": "The Highest for Buja",
      "card": "images/artworks/a61.jpg",
      "placements": [
        {
          "pano": "122",
          "yaw": 164,
          "pitch": -2
        },
        {
          "pano": "096",
          "yaw": 152,
          "pitch": -8
        }
      ]
    },
    {
      "id": "a62",
      "card_no": 62,
      "title": "ตู้พระไตรปิฎก",
      "title_en": "the tripitaka cabinet",
      "card": "images/artworks/a62.jpg",
      "placements": [
        {
          "pano": "158",
          "yaw": 124,
          "pitch": -5
        }
      ]
    },
    {
      "id": "a63",
      "card_no": 63,
      "title": "ธรรมาสน์",
      "title_en": "seat of sermon, sermon seat",
      "card": "images/artworks/a63.jpg",
      "placements": [
        {
          "pano": "158",
          "yaw": 65,
          "pitch": -8
        },
        {
          "pano": "177",
          "yaw": 90,
          "pitch": -8
        }
      ]
    },
    {
      "id": "a64",
      "card_no": 64,
      "title": "ธรรมาสน์",
      "title_en": "seat of sermon, sermon seat",
      "card": "images/artworks/a64.jpg",
      "placements": [
        {
          "pano": "158",
          "yaw": 94,
          "pitch": -8
        },
        {
          "pano": "177",
          "yaw": 122,
          "pitch": -8
        }
      ]
    },
    {
      "id": "a65",
      "card_no": 65,
      "title": "เจดีย์บรรจุพระสารีริกธาตุ",
      "title_en": "The stupa of relic of The Lord Buddha",
      "card": "images/artworks/a65.jpg",
      "placements": [
        {
          "pano": "151",
          "yaw": 59,
          "pitch": -14
        }
      ]
    },
    {
      "id": "a66",
      "card_no": 66,
      "title": "พระพุทธรูปปูนปั้น (พระเจ้าทันใจ)",
      "title_en": "Stucco Buddha statue (Instant God)",
      "card": "images/artworks/a66.jpg",
      "placements": []
    },
    {
      "id": "a67",
      "card_no": 67,
      "title": "ปูรณฆฏะ หรือ กุมภะ",
      "title_en": "Puranakata or Kumar",
      "card": "images/artworks/a67.jpg",
      "placements": [
        {
          "pano": "183",
          "yaw": -178.8,
          "pitch": -1.2
        }
      ]
    },
    {
      "id": "a68",
      "card_no": 68,
      "title": "อูปยอด",
      "title_en": "Upp",
      "card": "images/artworks/a68.jpg",
      "placements": [
        {
          "pano": "177",
          "yaw": 53,
          "pitch": -24
        }
      ]
    },
    {
      "id": "a69",
      "card_no": 69,
      "title": "เครื่องสูงประกอบยศ",
      "title_en": "High-ranking decoration",
      "card": "images/artworks/a69.jpg",
      "placements": [
        {
          "pano": "183",
          "yaw": -110,
          "pitch": 5
        }
      ]
    },
    {
      "id": "a70",
      "card_no": 70,
      "title": "พระแผงเนื้อดิน",
      "title_en": "The Soil Buddha Image in Panel Board",
      "card": "images/artworks/a70.jpg",
      "placements": [
        {
          "pano": "194",
          "yaw": 92.4,
          "pitch": -4.6
        }
      ]
    }
  ]
};
