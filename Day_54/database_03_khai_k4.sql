DROP TABLE IF EXISTS guests, rooms, reservation, services, service_detail;

CREATE TABLE IF NOT EXISTS "guests" (
  "code" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  "name" varchar(50),
  "address" text,
  "phone" varchar(11) NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  CONSTRAINT customers_phone_unique UNIQUE (phone)
);

CREATE TABLE IF NOT EXISTS "rooms" (
  "code" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  "type" varchar(20),
  "max_guests" int,
  "price" money DEFAULT 0,
  "describe" text,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS "reservation" (
  "code" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  "room_code" int,
  "guest_code" int,
  "date" DATE DEFAULT (now()),
  "start_time" time DEFAULT (now()),
  "end_time" time DEFAULT (now()),
  "deposit" text,
  "status" varchar(10),
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS "services" (
  "code" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  "name" varchar(100),
  "unit" varchar(10),
  "price" money DEFAULT 0,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS "service_detail" (
  "id" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  "service_code" int,
  "reservation_code" int,
  "quantity" int DEFAULT 0,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);


ALTER TABLE IF EXISTS "reservation" ADD FOREIGN KEY ("guest_code") REFERENCES "guests" ("code");

ALTER TABLE IF EXISTS "reservation" ADD FOREIGN KEY ("room_code") REFERENCES "rooms" ("code");

ALTER TABLE IF EXISTS "service_detail" ADD FOREIGN KEY ("reservation_code") REFERENCES "reservation" ("code");

ALTER TABLE IF EXISTS "service_detail" ADD FOREIGN KEY ("service_code") REFERENCES "services" ("code");


---- PHONG
-- INSERT INTO rooms(code, type, max_guests, price)
-- VALUES ('P0001', 'Loai 1', 20, 60000);

-- INSERT INTO rooms(code, type, max_guests, price)
-- VALUES ('P0002', 'Loai 2', 20, 80000);

-- INSERT INTO rooms(code, type, max_guests, price)
-- VALUES ('P0003', 'Loai 3', 20, 50000);

-- INSERT INTO rooms(code, type, max_guests, price)
-- VALUES ('P0004', 'Loai 4', 20, 50000);

INSERT INTO rooms(type, max_guests, price)
VALUES ('Loai 1', 20, 60000);

INSERT INTO rooms(type, max_guests, price)
VALUES ('Loai 2', 20, 80000);

INSERT INTO rooms(type, max_guests, price)
VALUES ('Loai 3', 20, 50000);

INSERT INTO rooms(type, max_guests, price)
VALUES ('Loai 4', 20, 50000);

---- KH
-- INSERT INTO guests(code, name, address, phone)
-- VALUES ('KH0001', 'Nguyen Van A', 'Hoa Xuan', 1111111111);

-- INSERT INTO guests(code, name, address, phone)
-- VALUES ('KH0002', 'Nguyen Van B', 'Hoa Hai', 1111111112);

-- INSERT INTO guests(code, name, address, phone)
-- VALUES ('KH0003', 'Pham Van A', 'Cam Le', 1111111113);

-- INSERT INTO guests(code, name, address, phone)
-- VALUES ('KH0004', 'Pham Van B', 'Hoa Xuan', 1111111114);

INSERT INTO guests(name, address, phone)
VALUES ('Nguyen Van A', 'Hoa Xuan', 1111111111);

INSERT INTO guests(name, address, phone)
VALUES ('Nguyen Van B', 'Hoa Hai', 1111111112);

INSERT INTO guests(name, address, phone)
VALUES ('Pham Van A', 'Cam Le', 1111111113);

INSERT INTO guests(name, address, phone)
VALUES ('Pham Van B', 'Hoa Xuan', 1111111114);



---- DV
-- INSERT INTO services(code, name, unit, price)
-- VALUES ('DV001', 'Beer', 'lon', 10000);

-- INSERT INTO services(code, name, unit, price)
-- VALUES ('DV002', 'Nuoc ngot', 'lon', 8000);

-- INSERT INTO services(code, name, unit, price)
-- VALUES ('DV003', 'Trai cay', 'dia', 35000);

-- INSERT INTO services(code, name, unit, price)
-- VALUES ('DV004', 'Khan uot', 'cai', 2000);

INSERT INTO services(name, unit, price)
VALUES ('Beer', 'lon', 10000);

INSERT INTO services(name, unit, price)
VALUES ('Nuoc ngot', 'lon', 8000);

INSERT INTO services(name, unit, price)
VALUES ('Trai cay', 'dia', 35000);

INSERT INTO services(name, unit, price)
VALUES ('Khan uot', 'cai', 2000);

---- Dat phong
-- INSERT INTO reservation(code, room_code, guest_code, date, start_time, end_time, deposit, status)
-- VALUES ('DP0001', 'P0001', 'KH0002', '2018-03-26', '11:00', '13:30', 100000, 'Da dat');

-- INSERT INTO reservation(code, room_code, guest_code, date, start_time, end_time, deposit, status)
-- VALUES ('DP0002', 'P0001', 'KH0003', '2018-03-27', '17:15', '19:15', 50000, 'Da huy');

-- INSERT INTO reservation(code, room_code, guest_code, date, start_time, end_time, deposit, status)
-- VALUES ('DP0003', 'P0002', 'KH0002', '2018-03-26', '20:30', '22:15', 100000, 'Da dat');

-- INSERT INTO reservation(code, room_code, guest_code, date, start_time, end_time, deposit, status)
-- VALUES ('DP0004', 'P0003', 'KH0001', '2018-04-01', '19:30', '21:15', 200000, 'Da dat');

INSERT INTO reservation(room_code, guest_code, date, start_time, end_time, deposit, status)
VALUES (1, 2, '2018-03-26', '11:00', '13:30', 100000, 'Da dat');

INSERT INTO reservation(room_code, guest_code, date, start_time, end_time, deposit, status)
VALUES (1, 3, '2018-03-27', '17:15', '19:15', 50000, 'Da huy');

INSERT INTO reservation(room_code, guest_code, date, start_time, end_time, deposit, status)
VALUES (2, 2, '2018-03-26', '20:30', '22:15', 100000, 'Da dat');

INSERT INTO reservation(room_code, guest_code, date, start_time, end_time, deposit, status)
VALUES (3, 1, '2018-04-01', '19:30', '21:15', 200000, 'Da dat');

---- chi tiet dich vu
-- INSERT INTO service_detail(reservation_code, service_code, quantity)
-- VALUES ('DP0001', 'DV001', 20);

-- INSERT INTO service_detail(reservation_code, service_code, quantity)
-- VALUES ('DP0001', 'DV003', 3);

-- INSERT INTO service_detail(reservation_code, service_code, quantity)
-- VALUES ('DP0001', 'DV002', 10);

-- INSERT INTO service_detail(reservation_code, service_code, quantity)
-- VALUES ('DP0002', 'DV002', 10);

-- INSERT INTO service_detail(reservation_code, service_code, quantity)
-- VALUES ('DP0002', 'DV003', 1);

-- INSERT INTO service_detail(reservation_code, service_code, quantity)
-- VALUES ('DP0003', 'DV003', 2);

-- INSERT INTO service_detail(reservation_code, service_code, quantity)
-- VALUES ('DP0003', 'DV004', 10);

INSERT INTO service_detail(reservation_code, service_code, quantity)
VALUES (1, 1, 20);

INSERT INTO service_detail(reservation_code, service_code, quantity)
VALUES (1, 3, 3);

INSERT INTO service_detail(reservation_code, service_code, quantity)
VALUES (1, 2, 10);

INSERT INTO service_detail(reservation_code, service_code, quantity)
VALUES (2, 2, 10);

INSERT INTO service_detail(reservation_code, service_code, quantity)
VALUES (2, 3, 1);

INSERT INTO service_detail(reservation_code, service_code, quantity)
VALUES (3, 3, 2);

INSERT INTO service_detail(reservation_code, service_code, quantity)
VALUES (3, 4, 10);

---- Câu 1: Hiển thị MaDatPhong, MaPhong, LoaiPhong, GiaPhong, TenKH, NgayDat, TongTienHat, TongTienSuDungDichVu, TongTienThanhToan 
---- tương ứng với từng mã đặt phòng có trong bảng DAT_PHONG. 
---- Những đơn đặt phòng nào không sử dụng dịch vụ đi kèm thì cũng liệt kê thông tin của đơn đặt phòng đó ra

---- TongTienHat = GiaPhong * (GioKetThuc – GioBatDau) 
---- TongTienSuDungDichVu = SoLuong * DonGia 
---- TongTienThanhToan = TongTienHat + sum (TongTienSuDungDichVu)

SET lc_monetary = 'vi_VN';

SELECT
	CONCAT('DP', LPAD(reservation_code::varchar(4), 4, '0')) AS ma_dat_phong, 
	CONCAT('P', LPAD(rooms_code::varchar(4), 4, '0')) AS ma_phong,
	loai_phong,
	gia_phong, 
	ten_kh,
  ngay_dat,
	tong_tien_hat,
	COALESCE(total_services, 0::money) AS tong_tien_su_dung_dich_vu,
	(COALESCE(total_services, 0::money) + tong_tien_hat) AS tong_tien_thanh_toan
FROM (
	SELECT
      reservation.code AS reservation_code, 
      rooms.code AS rooms_code,
      rooms.type AS loai_phong, 
      rooms.price AS gia_phong,
      guests.name AS ten_kh,
      TO_CHAR(reservation.date, 'dd/mm/yyyy') AS ngay_dat,
      (rooms.price * EXTRACT(EPOCH 
        FROM (reservation.end_time - reservation.start_time)) / 3600) 
        AS tong_tien_hat
    FROM reservation
    INNER JOIN guests
    ON guests.code = reservation.guest_code
    INNER JOIN rooms
    ON rooms.code = reservation.room_code
)
LEFT JOIN (
	SELECT 
    service_detail.reservation_code AS service_detail_reservation_code,
    SUM(service_detail.quantity * services.price) AS total_services
	FROM service_detail
	INNER JOIN services
	ON services.code = service_detail.service_code
	GROUP BY service_detail.reservation_code
)
ON reservation_code = service_detail_reservation_code;

---- Câu 2: Hiển thị MaKH, TenKH, DiaChi, SoDT của những khách hàng đã từng đặt phòng karaoke có địa chỉ ở “Hoa Xuan”

SELECT
  CONCAT('KH', LPAD(guests.code::varchar(4), 4, '0')) AS ma_kh,
  guests.name AS ten_kh,
  guests.address AS dia_chi,
  guests.phone AS so_dt
FROM guests 
INNER JOIN reservation
ON guests.code = reservation.guest_code
WHERE LOWER(guests.address) LIKE LOWER('%Hoa Xuan%');

---- Câu 3: Hiển thị MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, SoLanDat 
---- của những phòng được khách hàng đặt có số lần đặt lớn hơn 2 lần và trạng thái đặt là “Da dat”

---- TEST CASE 3
INSERT INTO reservation(room_code, guest_code, date, start_time, end_time, deposit, status)
VALUES (2, 2, '2019-03-26', '01:00', '3:00', 100000, 'Da dat');

INSERT INTO reservation(room_code, guest_code, date, start_time, end_time, deposit, status)
VALUES (2, 2, '2016-03-26', '18:30', '22:15', 100000, 'Da dat');

SELECT
	-- rooms.code: 1 => P0001 / CONCAT(P, 0001)
	-- LPAD(string, length[, fill]) / LPAD(int::varchar(x), x, '*'])
  CONCAT('P', LPAD(rooms.code::varchar(4), 4, '0')) AS ma_phong,
  rooms.type AS loai_phong,
  rooms.max_guests AS so_khach_toi_da,
  rooms.price AS gia_phong,
  COUNT (rooms.code) AS so_lan_dat
FROM rooms
INNER JOIN reservation 
ON rooms.code = reservation.room_code
WHERE LOWER(reservation.status) LIKE LOWER('%Da dat%')
GROUP BY rooms.code
HAVING COUNT(rooms.code) > 2;

-- SELECT * FROM guests
-- SELECT * FROM rooms
-- SELECT * FROM reservation
-- SELECT * FROM services
-- SELECT * FROM service_detail