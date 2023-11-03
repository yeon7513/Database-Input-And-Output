-- 만약 top100 데이터베이스가 있으면 삭제함.
drop database if exists top100;

-- top100 데이터베이스 생성
create database top100;

-- top100 데이터베이스 사용
use top100;

-- 100대 명산 테이블 생성
create table famous_maountains
(
	no int auto_increment not null primary key,
  region varchar(50) not null,
  mt_name char(8) not null,
  AMSL decimal(5,1)
);

-- 한국관광 100선 테이블 생성
create table korean_tourist
(
	no int auto_increment not null primary key,
  spot char(15) not null,
  addr varchar(50) not null,
  keyword varchar(30)
);

-- 죽기전에 가봐야 할 세계 100대 여행지 테이블 생성
create table world_travel
(
	no int auto_increment not null primary key,
  destination varchar(20) not null,
  country char(10) not null,
  img longblob,
  img_src varchar(100)
);

-- 100대 영화 테이블 생성
create table movies
(
	no int auto_increment not null primary key,
  title varchar(30) not null,
  title_en varchar(30),
  summary varchar(100),
  production_year int,
  director char(10) not null,
  country char(10)
);

-- 100대 명작 테이블 생성
create table masterpiece
(
	no int auto_increment not null primary key,
  book_name varchar(20) not null,
  author varchar(10) not null,
  summary varchar(100)
);

-- 생성 확인하기
select * from famous_maountains;
select * from korean_tourist;
select * from world_travel;
select * from movies;
select * from masterpiece;