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
        "x": -7.61,
        "y": 11.63,
        "w": 70.51,
        "h": 24.96
      },
      {
        "label": "ระเบียงทางเดิน",
        "x": -7.61,
        "y": -5.03,
        "w": 70.51,
        "h": 16.66
      }
    ]
  },
  "compass": {
    "door": "p194",
    "doorYaw": 5.9,
    "doorAzimuth": 35.0,
    "mapUpAzimuth": 38.1
  },
  "model": {
    "scale": 0.20625,
    "height": 2.142,
    "railHeight": 0.6,
    "rooms": [
      {
        "label": "ห้องจัดแสดง หอพุทธศิลป์",
        "x": -7.61,
        "y": 11.63,
        "w": 70.51,
        "h": 24.96,
        "kind": "hall"
      },
      {
        "label": "ระเบียงทางเดิน",
        "x": -7.61,
        "y": -5.03,
        "w": 70.51,
        "h": 16.66,
        "kind": "corridor"
      }
    ],
    "atlas": {
      "image": "images/model/atlas.jpg",
      "cols": 4,
      "rows": 7,
      "cells": {
        "p048": [
          0,
          0
        ],
        "p053": [
          1,
          0
        ],
        "p060": [
          2,
          0
        ],
        "p069": [
          3,
          0
        ],
        "p072": [
          0,
          1
        ],
        "p075": [
          1,
          1
        ],
        "p080": [
          2,
          1
        ],
        "p089": [
          3,
          1
        ],
        "p096": [
          0,
          2
        ],
        "p116": [
          1,
          2
        ],
        "p122": [
          2,
          2
        ],
        "p128": [
          3,
          2
        ],
        "p136": [
          0,
          3
        ],
        "p143": [
          1,
          3
        ],
        "p145": [
          2,
          3
        ],
        "p151": [
          3,
          3
        ],
        "p158": [
          0,
          4
        ],
        "p177": [
          1,
          4
        ],
        "p183": [
          2,
          4
        ],
        "p194": [
          3,
          4
        ],
        "p195": [
          0,
          5
        ],
        "p201": [
          1,
          5
        ],
        "p203": [
          2,
          5
        ],
        "p206": [
          3,
          5
        ],
        "p210": [
          0,
          6
        ],
        "p212": [
          1,
          6
        ],
        "p215": [
          2,
          6
        ],
        "p220": [
          3,
          6
        ]
      }
    }
  },
  "scenes": [
    {
      "id": "p048",
      "title": "โซนวิถีชีวิตและเครื่องใช้พื้นบ้าน (1)",
      "description": "เครื่องมือเครื่องใช้พื้นบ้าน หูก กี่ทอผ้า และบอร์ดนิทรรศการพุทธศิลป์",
      "image": "images/panoramas/p048.jpg",
      "map": {
        "x": 4.18,
        "y": 24.99
      },
      "northOffset": 101.1,
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
        },
        {
          "yaw": 8,
          "pitch": -20,
          "artwork": "a28",
          "title": "ปั๊บสา (สมุดข่อย)",
          "subtitle": "Note Book",
          "card": "images/artworks/a28.jpg"
        },
        {
          "yaw": 77,
          "pitch": -12,
          "artwork": "a39",
          "title": "ขันพานทองเหลือง",
          "subtitle": "Brass bowl",
          "card": "images/artworks/a39.jpg",
          "approx": true
        },
        {
          "yaw": 73,
          "pitch": -12,
          "artwork": "a41",
          "title": "กระบอกชงชา",
          "subtitle": "Tea maker",
          "card": "images/artworks/a41.jpg"
        },
        {
          "yaw": 70,
          "pitch": -15,
          "artwork": "a42",
          "title": "ถาดทองเหลืองก้นลึก",
          "subtitle": "Brass tray",
          "card": "images/artworks/a42.jpg"
        },
        {
          "yaw": 66.5,
          "pitch": -17,
          "artwork": "a43",
          "title": "ครอบกำยาน",
          "subtitle": "frankincense Covering",
          "card": "images/artworks/a43.jpg"
        },
        {
          "yaw": 62,
          "pitch": -18,
          "artwork": "a44",
          "title": "เด็งหรือกระดิ่ง",
          "subtitle": "Bell",
          "card": "images/artworks/a44.jpg"
        },
        {
          "yaw": -27,
          "pitch": -20,
          "artwork": "a45",
          "title": "ขันหมากและเครื่องเขินล้านนา",
          "subtitle": "Lanna Lacquer ware",
          "card": "images/artworks/a45.jpg"
        },
        {
          "yaw": -14,
          "pitch": -24,
          "artwork": "a47",
          "title": "ขันหมากและเครื่องเขินล้านนา",
          "subtitle": "Lanna Lacquer ware",
          "card": "images/artworks/a47.jpg",
          "approx": true
        },
        {
          "yaw": -45,
          "pitch": -15,
          "artwork": "a48",
          "title": "ขันหมากและเครื่องเขินล้านนา",
          "subtitle": "Lanna Lacquer ware",
          "card": "images/artworks/a48.jpg"
        },
        {
          "yaw": 41,
          "pitch": -23,
          "artwork": "a49",
          "title": "ทองเหลือง",
          "subtitle": "Brass bowl",
          "card": "images/artworks/a49.jpg"
        },
        {
          "yaw": 50,
          "pitch": -21,
          "artwork": "a50",
          "title": "น้ำถุ้ง",
          "subtitle": "Water Scoop",
          "card": "images/artworks/a50.jpg"
        },
        {
          "yaw": -19,
          "pitch": -26,
          "artwork": "a51",
          "title": "หมอนไม้ หรือ หมอนนมสาว",
          "subtitle": "Wooden Pillow",
          "card": "images/artworks/a51.jpg",
          "approx": true
        },
        {
          "yaw": 27,
          "pitch": -18,
          "artwork": "a52",
          "title": "ถาดร่อนทองคำ",
          "subtitle": "Gold pan tray",
          "card": "images/artworks/a52.jpg"
        },
        {
          "yaw": -56,
          "pitch": -11,
          "artwork": "a53",
          "title": "แร้วคอม้า (กับดักคอม้า)",
          "subtitle": "Horse Snare",
          "card": "images/artworks/a53.jpg",
          "approx": true
        },
        {
          "yaw": -61,
          "pitch": -6,
          "artwork": "a54",
          "title": "ม้าหั่นใบยาสูบ",
          "subtitle": "tobacco turning",
          "card": "images/artworks/a54.jpg",
          "approx": true
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
        "y": 18.51
      },
      "northOffset": 90.2,
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
        },
        {
          "yaw": -126,
          "pitch": -7,
          "artwork": "a34",
          "title": "เปียทอผ้า",
          "subtitle": "Braid weaving",
          "card": "images/artworks/a34.jpg"
        },
        {
          "yaw": -136,
          "pitch": -19,
          "artwork": "a35",
          "title": "ฟืมทอผ้า",
          "subtitle": "Feum weaving",
          "card": "images/artworks/a35.jpg"
        },
        {
          "yaw": 3,
          "pitch": -28,
          "artwork": "a36",
          "title": "เครื่องเสียงโบราณและแผ่นเสียง",
          "subtitle": "Antique audio and Recording plate",
          "card": "images/artworks/a36.jpg"
        },
        {
          "yaw": -55.5,
          "pitch": -18,
          "artwork": "a37",
          "title": "ฮอก",
          "subtitle": "Wooden bell",
          "card": "images/artworks/a37.jpg"
        },
        {
          "yaw": -17,
          "pitch": -25,
          "artwork": "a38",
          "title": "ขันพานทองเหลือง",
          "subtitle": "Brass bowl",
          "card": "images/artworks/a38.jpg"
        },
        {
          "yaw": -49,
          "pitch": -17,
          "artwork": "a40",
          "title": "ตลับเมตรโบราณ",
          "subtitle": "Antique meter",
          "card": "images/artworks/a40.jpg",
          "approx": true
        },
        {
          "yaw": -28,
          "pitch": -23,
          "artwork": "a41",
          "title": "กระบอกชงชา",
          "subtitle": "Tea maker",
          "card": "images/artworks/a41.jpg"
        },
        {
          "yaw": -40,
          "pitch": -23,
          "artwork": "a42",
          "title": "ถาดทองเหลืองก้นลึก",
          "subtitle": "Brass tray",
          "card": "images/artworks/a42.jpg"
        },
        {
          "yaw": -47.5,
          "pitch": -22,
          "artwork": "a43",
          "title": "ครอบกำยาน",
          "subtitle": "frankincense Covering",
          "card": "images/artworks/a43.jpg"
        },
        {
          "yaw": -51,
          "pitch": -20,
          "artwork": "a44",
          "title": "เด็งหรือกระดิ่ง",
          "subtitle": "Bell",
          "card": "images/artworks/a44.jpg"
        },
        {
          "yaw": -75,
          "pitch": -7,
          "artwork": "a46",
          "title": "ขันหมากและเครื่องเขินล้านนา",
          "subtitle": "Lanna Lacquer ware",
          "card": "images/artworks/a46.jpg",
          "approx": true
        }
      ]
    },
    {
      "id": "p060",
      "title": "โซนวิถีชีวิตและเครื่องใช้พื้นบ้าน (3)",
      "description": "เครื่องมือเครื่องใช้พื้นบ้าน หูก กี่ทอผ้า และบอร์ดนิทรรศการพุทธศิลป์",
      "image": "images/panoramas/p060.jpg",
      "map": {
        "x": 9.3,
        "y": 24.31
      },
      "northOffset": 86.2,
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
        "x": 15.05,
        "y": 28.26
      },
      "northOffset": -174.2,
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
        "x": 14.67,
        "y": 22.6
      },
      "northOffset": 82.8,
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
          "yaw": 110,
          "pitch": -13,
          "artwork": "a29",
          "title": "หม้อดินเผา",
          "subtitle": "Clay pot",
          "card": "images/artworks/a29.jpg"
        },
        {
          "yaw": 110,
          "pitch": -3,
          "artwork": "a30",
          "title": "รูปปั้นหรือรูปหล่อพิมพ์เกจิอาจารย์",
          "subtitle": "Simulate of Monks",
          "card": "images/artworks/a30.jpg"
        },
        {
          "yaw": 110,
          "pitch": 9,
          "artwork": "a31",
          "title": "เจดีย์จำลอง",
          "subtitle": "Simulate Pagoda",
          "card": "images/artworks/a31.jpg"
        },
        {
          "yaw": -55,
          "pitch": -13,
          "artwork": "a57",
          "title": "ขันหมากเครื่องเขินล้านนา",
          "subtitle": "Lanna Lacquer ware",
          "card": "images/artworks/a57.jpg"
        },
        {
          "yaw": -5,
          "pitch": 2,
          "artwork": "a58",
          "title": "รูปปั้นพระมหาโพธิวงศาจารย์",
          "subtitle": "Phramaha Bhodhiwongsajarn Statue",
          "card": "images/artworks/a58.jpg"
        },
        {
          "yaw": -127,
          "pitch": -13,
          "artwork": "a59",
          "title": "เครื่องเคลือบดินเผา",
          "subtitle": "Porcelain",
          "card": "images/artworks/a59.jpg"
        },
        {
          "yaw": -127,
          "pitch": 2,
          "artwork": "a60",
          "title": "พระบูชา",
          "subtitle": "Worshiping Buddha image",
          "card": "images/artworks/a60.jpg"
        }
      ]
    },
    {
      "id": "p075",
      "title": "โซนจิตรกรรมร่วมสมัย (3)",
      "description": "ภาพจิตรกรรมพุทธศิลป์ร่วมสมัยและมุมสักการะรูปเหมือนพระเถระ",
      "image": "images/panoramas/p075.jpg",
      "map": {
        "x": 19.05,
        "y": 17.22
      },
      "northOffset": -175.1,
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
        "x": 19.24,
        "y": 22.58
      },
      "northOffset": 94.0,
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
        "x": 22.47,
        "y": 28.81
      },
      "northOffset": 5.9,
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
        "x": 23.97,
        "y": 20.05
      },
      "northOffset": -0.2,
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
          "yaw": 152,
          "pitch": -2,
          "artwork": "a08",
          "title": "เครื่องสูงบูชาพระเจ้าห้าพระองค์",
          "subtitle": "The Highest Worshiping",
          "card": "images/artworks/a08.jpg"
        },
        {
          "yaw": 100,
          "pitch": -15,
          "artwork": "a10",
          "title": "แผ่นยันต์",
          "subtitle": "talisman or fabric",
          "card": "images/artworks/a10.jpg"
        },
        {
          "yaw": 138,
          "pitch": -14,
          "artwork": "a27",
          "title": "ก้างธรรม",
          "subtitle": "Dhamma Script Hanger",
          "card": "images/artworks/a27.jpg"
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
        "x": 26.9,
        "y": 14.85
      },
      "northOffset": 1.1,
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
        "x": 29.51,
        "y": 25.61
      },
      "northOffset": -1.3,
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
          "yaw": 172,
          "pitch": 4,
          "artwork": "a08",
          "title": "เครื่องสูงบูชาพระเจ้าห้าพระองค์",
          "subtitle": "The Highest Worshiping",
          "card": "images/artworks/a08.jpg"
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
        "x": 34.71,
        "y": 27.84
      },
      "northOffset": 8.4,
      "links": [
        {
          "to": "p151"
        },
        {
          "to": "p136"
        }
      ],
      "infos": [
        {
          "yaw": -6.5,
          "pitch": -6,
          "artwork": "a13",
          "title": "พระพุทธรูปปางมารวิชัย",
          "subtitle": "Maravichaya Buddha Image Style",
          "card": "images/artworks/a13.jpg"
        },
        {
          "yaw": 7,
          "pitch": -6,
          "artwork": "a15",
          "title": "พระพุทธรูปปางมารวิชัย",
          "subtitle": "Maravichaya Buddha Image Style",
          "card": "images/artworks/a15.jpg",
          "approx": true
        },
        {
          "yaw": 37,
          "pitch": -6,
          "artwork": "a16",
          "title": "พระพุทธรูปปางมารวิชัย",
          "subtitle": "Maravichaya Buddha Image Style",
          "card": "images/artworks/a16.jpg",
          "approx": true
        },
        {
          "yaw": 21,
          "pitch": -8,
          "artwork": "a17",
          "title": "พระพุทธรูปปางมารวิชัย",
          "subtitle": "Maravichaya Buddha Image Style",
          "card": "images/artworks/a17.jpg"
        }
      ]
    },
    {
      "id": "p136",
      "title": "โซนพระพุทธรูป (1)",
      "description": "พระพุทธรูปหลากหลายพุทธลักษณะที่จัดแสดงบนแท่นไม้",
      "image": "images/panoramas/p136.jpg",
      "map": {
        "x": 35.31,
        "y": 19.74
      },
      "northOffset": 9.5,
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
          "yaw": 175,
          "pitch": -8,
          "artwork": "a20",
          "title": "พระประจำวันเกิดวันพุธ กลางวัน พระปางอุ้มบาตร",
          "subtitle": "Wednesday Buddha Image",
          "card": "images/artworks/a20.jpg"
        },
        {
          "yaw": -173.7,
          "pitch": -16.9,
          "artwork": "a22",
          "title": "พระพุทธรูปประจำวันเกิดวันพฤหัสบดี พระปางตรัสรู้หรือปางสมาธิ",
          "subtitle": "Thursday Buddha Image",
          "card": "images/artworks/a22.jpg"
        },
        {
          "yaw": -112,
          "pitch": -8,
          "artwork": "a24",
          "title": "พระประจำวันเกิดวันพุธ (ราหู) ปางป่าเลไลย์",
          "subtitle": "Wednesday Night Buddha Image (Sitting Style)",
          "card": "images/artworks/a24.jpg"
        }
      ]
    },
    {
      "id": "p143",
      "title": "โซนพระพุทธรูป (2)",
      "description": "พระพุทธรูปหลากหลายพุทธลักษณะที่จัดแสดงบนแท่นไม้",
      "image": "images/panoramas/p143.jpg",
      "map": {
        "x": 36.67,
        "y": 16.73
      },
      "northOffset": -11.4,
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
        },
        {
          "yaw": -147,
          "pitch": -7,
          "artwork": "a25",
          "title": "พระประจำวันเกิดวันพุธกลางคืน",
          "subtitle": "Wednesday Night Buddha Image (Sitting Style)",
          "card": "images/artworks/a25.jpg",
          "approx": true
        }
      ]
    },
    {
      "id": "p145",
      "title": "โซนพระพุทธรูป (3)",
      "description": "พระพุทธรูปหลากหลายพุทธลักษณะที่จัดแสดงบนแท่นไม้",
      "image": "images/panoramas/p145.jpg",
      "map": {
        "x": 39.25,
        "y": 16.76
      },
      "northOffset": -2.4,
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
        },
        {
          "yaw": 166,
          "pitch": -5,
          "artwork": "a18",
          "title": "พระประจำวันเกิดวันอาทิตย์ปางถวายเนตรแกะสลักไม้",
          "subtitle": "Saturday Wooden Buddha Image",
          "card": "images/artworks/a18.jpg"
        },
        {
          "yaw": -178,
          "pitch": -3,
          "artwork": "a19",
          "title": "พระพุทธรูปปางห้ามแก่นจันทร์",
          "subtitle": "Buddha Image",
          "card": "images/artworks/a19.jpg"
        }
      ]
    },
    {
      "id": "p151",
      "title": "โซนพระพุทธรูป (4)",
      "description": "พระพุทธรูปหลากหลายพุทธลักษณะที่จัดแสดงบนแท่นไม้",
      "image": "images/panoramas/p151.jpg",
      "map": {
        "x": 39.0,
        "y": 23.89
      },
      "northOffset": 5.6,
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
        "x": 43.68,
        "y": 22.16
      },
      "northOffset": -88.5,
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
        "x": 47.25,
        "y": 21.91
      },
      "northOffset": -82.3,
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
          "yaw": -35,
          "pitch": -3,
          "artwork": "a26",
          "title": "สุ่มดอกล้านนา",
          "subtitle": "Lanna flower Bowl",
          "card": "images/artworks/a26.jpg"
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
        },
        {
          "yaw": 38,
          "pitch": 0,
          "artwork": "a69",
          "title": "เครื่องสูงประกอบยศ",
          "subtitle": "High-ranking decoration",
          "card": "images/artworks/a69.jpg"
        }
      ]
    },
    {
      "id": "p183",
      "title": "พระพุทธรูปประธาน",
      "description": "พระพุทธรูปประทับนั่งพร้อมเครื่องสักการะ และจิตรกรรมพื้นหลัง",
      "image": "images/panoramas/p183.jpg",
      "map": {
        "x": 53.28,
        "y": 26.43
      },
      "northOffset": 2.0,
      "links": [
        {
          "to": "p194"
        }
      ],
      "infos": [
        {
          "yaw": 19,
          "pitch": -4,
          "artwork": "a26",
          "title": "สุ่มดอกล้านนา",
          "subtitle": "Lanna flower Bowl",
          "card": "images/artworks/a26.jpg"
        },
        {
          "yaw": -179,
          "pitch": -2,
          "artwork": "a66",
          "title": "พระพุทธรูปปูนปั้น (พระเจ้าทันใจ)",
          "subtitle": "Stucco Buddha statue (Instant God)",
          "card": "images/artworks/a66.jpg"
        },
        {
          "yaw": 157,
          "pitch": -8,
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
        "x": 52.57,
        "y": 16.23
      },
      "northOffset": 9.0,
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
        "x": 52.57,
        "y": 3.89
      },
      "northOffset": 4.5,
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
      "id": "p201",
      "title": "ระเบียงทางเดิน (1)",
      "description": "ระเบียงทางเดินด้านนอกเลียบหอพุทธศิลป์",
      "image": "images/panoramas/p201.jpg",
      "map": {
        "x": -5.61,
        "y": 4.12
      },
      "northOffset": 0.1,
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
        "x": 5.16,
        "y": 4.47
      },
      "northOffset": -0.7,
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
        "x": 15.93,
        "y": 4.71
      },
      "northOffset": -1.1,
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
        "x": 26.7,
        "y": 4.99
      },
      "northOffset": 0.0,
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
        "x": 37.47,
        "y": 5.21
      },
      "northOffset": -0.3,
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
        "x": 46.57,
        "y": -1.15
      },
      "northOffset": 2.3,
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
        "x": 45.46,
        "y": 5.39
      },
      "northOffset": -13.6,
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
      "placements": [
        {
          "pano": "122",
          "yaw": 172,
          "pitch": 4
        },
        {
          "pano": "096",
          "yaw": 152,
          "pitch": -2
        }
      ]
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
      "placements": [
        {
          "pano": "128",
          "yaw": -6.5,
          "pitch": -6
        }
      ]
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
      "placements": [
        {
          "pano": "128",
          "yaw": 7,
          "pitch": -6,
          "approx": true
        }
      ]
    },
    {
      "id": "a16",
      "card_no": 16,
      "title": "พระพุทธรูปปางมารวิชัย",
      "title_en": "Maravichaya Buddha Image Style",
      "card": "images/artworks/a16.jpg",
      "placements": [
        {
          "pano": "128",
          "yaw": 37,
          "pitch": -6,
          "approx": true
        }
      ]
    },
    {
      "id": "a17",
      "card_no": 17,
      "title": "พระพุทธรูปปางมารวิชัย",
      "title_en": "Maravichaya Buddha Image Style",
      "card": "images/artworks/a17.jpg",
      "placements": [
        {
          "pano": "128",
          "yaw": 21,
          "pitch": -8
        }
      ]
    },
    {
      "id": "a18",
      "card_no": 18,
      "title": "พระประจำวันเกิดวันอาทิตย์ปางถวายเนตรแกะสลักไม้",
      "title_en": "Saturday Wooden Buddha Image",
      "card": "images/artworks/a18.jpg",
      "placements": [
        {
          "pano": "145",
          "yaw": 166,
          "pitch": -5
        }
      ]
    },
    {
      "id": "a19",
      "card_no": 19,
      "title": "พระพุทธรูปปางห้ามแก่นจันทร์",
      "title_en": "Buddha Image",
      "card": "images/artworks/a19.jpg",
      "placements": [
        {
          "pano": "145",
          "yaw": -178,
          "pitch": -3
        }
      ]
    },
    {
      "id": "a20",
      "card_no": 20,
      "title": "พระประจำวันเกิดวันพุธ กลางวัน พระปางอุ้มบาตร",
      "title_en": "Wednesday Buddha Image",
      "card": "images/artworks/a20.jpg",
      "placements": [
        {
          "pano": "136",
          "yaw": 175,
          "pitch": -8
        }
      ]
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
      "placements": [
        {
          "pano": "136",
          "yaw": -112,
          "pitch": -8
        }
      ]
    },
    {
      "id": "a25",
      "card_no": 25,
      "title": "พระประจำวันเกิดวันพุธกลางคืน",
      "title_en": "Wednesday Night Buddha Image (Sitting Style)",
      "card": "images/artworks/a25.jpg",
      "placements": [
        {
          "pano": "143",
          "yaw": -147,
          "pitch": -7,
          "approx": true
        }
      ]
    },
    {
      "id": "a26",
      "card_no": 26,
      "title": "สุ่มดอกล้านนา",
      "title_en": "Lanna flower Bowl",
      "card": "images/artworks/a26.jpg",
      "placements": [
        {
          "pano": "177",
          "yaw": -35,
          "pitch": -3
        },
        {
          "pano": "183",
          "yaw": 19,
          "pitch": -4
        }
      ]
    },
    {
      "id": "a27",
      "card_no": 27,
      "title": "ก้างธรรม",
      "title_en": "Dhamma Script Hanger",
      "card": "images/artworks/a27.jpg",
      "placements": [
        {
          "pano": "096",
          "yaw": 138,
          "pitch": -14
        }
      ]
    },
    {
      "id": "a28",
      "card_no": 28,
      "title": "ปั๊บสา (สมุดข่อย)",
      "title_en": "Note Book",
      "card": "images/artworks/a28.jpg",
      "placements": [
        {
          "pano": "048",
          "yaw": 8,
          "pitch": -20
        }
      ]
    },
    {
      "id": "a29",
      "card_no": 29,
      "title": "หม้อดินเผา",
      "title_en": "Clay pot",
      "card": "images/artworks/a29.jpg",
      "placements": [
        {
          "pano": "072",
          "yaw": 110,
          "pitch": -13
        }
      ]
    },
    {
      "id": "a30",
      "card_no": 30,
      "title": "รูปปั้นหรือรูปหล่อพิมพ์เกจิอาจารย์",
      "title_en": "Simulate of Monks",
      "card": "images/artworks/a30.jpg",
      "placements": [
        {
          "pano": "072",
          "yaw": 110,
          "pitch": -3
        }
      ]
    },
    {
      "id": "a31",
      "card_no": 31,
      "title": "เจดีย์จำลอง",
      "title_en": "Simulate Pagoda",
      "card": "images/artworks/a31.jpg",
      "placements": [
        {
          "pano": "072",
          "yaw": 110,
          "pitch": 9
        }
      ]
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
      "placements": [
        {
          "pano": "053",
          "yaw": -126,
          "pitch": -7
        }
      ]
    },
    {
      "id": "a35",
      "card_no": 35,
      "title": "ฟืมทอผ้า",
      "title_en": "Feum weaving",
      "card": "images/artworks/a35.jpg",
      "placements": [
        {
          "pano": "053",
          "yaw": -136,
          "pitch": -19
        }
      ]
    },
    {
      "id": "a36",
      "card_no": 36,
      "title": "เครื่องเสียงโบราณและแผ่นเสียง",
      "title_en": "Antique audio and Recording plate",
      "card": "images/artworks/a36.jpg",
      "placements": [
        {
          "pano": "053",
          "yaw": 3,
          "pitch": -28
        }
      ]
    },
    {
      "id": "a37",
      "card_no": 37,
      "title": "ฮอก",
      "title_en": "Wooden bell",
      "card": "images/artworks/a37.jpg",
      "placements": [
        {
          "pano": "053",
          "yaw": -55.5,
          "pitch": -18
        }
      ]
    },
    {
      "id": "a38",
      "card_no": 38,
      "title": "ขันพานทองเหลือง",
      "title_en": "Brass bowl",
      "card": "images/artworks/a38.jpg",
      "placements": [
        {
          "pano": "053",
          "yaw": -17,
          "pitch": -25
        }
      ]
    },
    {
      "id": "a39",
      "card_no": 39,
      "title": "ขันพานทองเหลือง",
      "title_en": "Brass bowl",
      "card": "images/artworks/a39.jpg",
      "placements": [
        {
          "pano": "048",
          "yaw": 77,
          "pitch": -12,
          "approx": true
        }
      ]
    },
    {
      "id": "a40",
      "card_no": 40,
      "title": "ตลับเมตรโบราณ",
      "title_en": "Antique meter",
      "card": "images/artworks/a40.jpg",
      "placements": [
        {
          "pano": "053",
          "yaw": -49,
          "pitch": -17,
          "approx": true
        }
      ]
    },
    {
      "id": "a41",
      "card_no": 41,
      "title": "กระบอกชงชา",
      "title_en": "Tea maker",
      "card": "images/artworks/a41.jpg",
      "placements": [
        {
          "pano": "053",
          "yaw": -28,
          "pitch": -23
        },
        {
          "pano": "048",
          "yaw": 73,
          "pitch": -12
        }
      ]
    },
    {
      "id": "a42",
      "card_no": 42,
      "title": "ถาดทองเหลืองก้นลึก",
      "title_en": "Brass tray",
      "card": "images/artworks/a42.jpg",
      "placements": [
        {
          "pano": "053",
          "yaw": -40,
          "pitch": -23
        },
        {
          "pano": "048",
          "yaw": 70,
          "pitch": -15
        }
      ]
    },
    {
      "id": "a43",
      "card_no": 43,
      "title": "ครอบกำยาน",
      "title_en": "frankincense Covering",
      "card": "images/artworks/a43.jpg",
      "placements": [
        {
          "pano": "053",
          "yaw": -47.5,
          "pitch": -22
        },
        {
          "pano": "048",
          "yaw": 66.5,
          "pitch": -17
        }
      ]
    },
    {
      "id": "a44",
      "card_no": 44,
      "title": "เด็งหรือกระดิ่ง",
      "title_en": "Bell",
      "card": "images/artworks/a44.jpg",
      "placements": [
        {
          "pano": "053",
          "yaw": -51,
          "pitch": -20
        },
        {
          "pano": "048",
          "yaw": 62,
          "pitch": -18
        }
      ]
    },
    {
      "id": "a45",
      "card_no": 45,
      "title": "ขันหมากและเครื่องเขินล้านนา",
      "title_en": "Lanna Lacquer ware",
      "card": "images/artworks/a45.jpg",
      "placements": [
        {
          "pano": "048",
          "yaw": -27,
          "pitch": -20
        }
      ]
    },
    {
      "id": "a46",
      "card_no": 46,
      "title": "ขันหมากและเครื่องเขินล้านนา",
      "title_en": "Lanna Lacquer ware",
      "card": "images/artworks/a46.jpg",
      "placements": [
        {
          "pano": "053",
          "yaw": -75,
          "pitch": -7,
          "approx": true
        }
      ]
    },
    {
      "id": "a47",
      "card_no": 47,
      "title": "ขันหมากและเครื่องเขินล้านนา",
      "title_en": "Lanna Lacquer ware",
      "card": "images/artworks/a47.jpg",
      "placements": [
        {
          "pano": "048",
          "yaw": -14,
          "pitch": -24,
          "approx": true
        }
      ]
    },
    {
      "id": "a48",
      "card_no": 48,
      "title": "ขันหมากและเครื่องเขินล้านนา",
      "title_en": "Lanna Lacquer ware",
      "card": "images/artworks/a48.jpg",
      "placements": [
        {
          "pano": "048",
          "yaw": -45,
          "pitch": -15
        }
      ]
    },
    {
      "id": "a49",
      "card_no": 49,
      "title": "ทองเหลือง",
      "title_en": "Brass bowl",
      "card": "images/artworks/a49.jpg",
      "placements": [
        {
          "pano": "048",
          "yaw": 41,
          "pitch": -23
        }
      ]
    },
    {
      "id": "a50",
      "card_no": 50,
      "title": "น้ำถุ้ง",
      "title_en": "Water Scoop",
      "card": "images/artworks/a50.jpg",
      "placements": [
        {
          "pano": "048",
          "yaw": 50,
          "pitch": -21
        }
      ]
    },
    {
      "id": "a51",
      "card_no": 51,
      "title": "หมอนไม้ หรือ หมอนนมสาว",
      "title_en": "Wooden Pillow",
      "card": "images/artworks/a51.jpg",
      "placements": [
        {
          "pano": "048",
          "yaw": -19,
          "pitch": -26,
          "approx": true
        }
      ]
    },
    {
      "id": "a52",
      "card_no": 52,
      "title": "ถาดร่อนทองคำ",
      "title_en": "Gold pan tray",
      "card": "images/artworks/a52.jpg",
      "placements": [
        {
          "pano": "048",
          "yaw": 27,
          "pitch": -18
        }
      ]
    },
    {
      "id": "a53",
      "card_no": 53,
      "title": "แร้วคอม้า (กับดักคอม้า)",
      "title_en": "Horse Snare",
      "card": "images/artworks/a53.jpg",
      "placements": [
        {
          "pano": "048",
          "yaw": -56,
          "pitch": -11,
          "approx": true
        }
      ]
    },
    {
      "id": "a54",
      "card_no": 54,
      "title": "ม้าหั่นใบยาสูบ",
      "title_en": "tobacco turning",
      "card": "images/artworks/a54.jpg",
      "placements": [
        {
          "pano": "048",
          "yaw": -61,
          "pitch": -6,
          "approx": true
        }
      ]
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
      "placements": [
        {
          "pano": "072",
          "yaw": -55,
          "pitch": -13
        }
      ]
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
      "placements": [
        {
          "pano": "072",
          "yaw": -127,
          "pitch": -13
        }
      ]
    },
    {
      "id": "a60",
      "card_no": 60,
      "title": "พระบูชา",
      "title_en": "Worshiping Buddha image",
      "card": "images/artworks/a60.jpg",
      "placements": [
        {
          "pano": "072",
          "yaw": -127,
          "pitch": 2
        }
      ]
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
      "placements": [
        {
          "pano": "183",
          "yaw": -179,
          "pitch": -2
        }
      ]
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
          "yaw": 157,
          "pitch": -8
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
        },
        {
          "pano": "177",
          "yaw": 38,
          "pitch": 0
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
