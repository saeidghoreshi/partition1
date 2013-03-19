insert into realestate.country (ID,name)values (1,'Canada');
insert into realestate.country (ID,name)values (2,'USA');


insert into realestate.province (ID,name,countryID)values (1,'Alberta',1);
insert into realestate.province (ID,name,countryID)values (2,'British Columbia',1);


insert into realestate.city (ID,name,provinceID)values (1,'Vernon',2);
insert into realestate.city (ID,name,provinceID)values (2,'Vancouver',2);

delete from realestate.status
insert into realestate.status (ID,name)values (1,'Active');
insert into realestate.status (ID,name)values (2,'Sold');
