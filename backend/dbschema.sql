START TRANSACTION;
SET FOREIGN_KEY_CHECKS=0;
create table if not exists `grupo_projeto` (
    `id_grupo_projeto` integer NOT NULL AUTO_INCREMENT,
    `id_socio` integer NOT NULL,
    `id_projeto` integer NOT NULL,

    PRIMARY KEY (`id_grupo_projeto`),
    FOREIGN KEY (`id_socio`) REFERENCES `membro`(`id_socio`),
    FOREIGN KEY (`id_projeto`)  REFERENCES `projeto`(`id_projeto`)
);

create table if not exists `membro` (
    `id_socio` integer NOT NULL AUTO_INCREMENT,
    `nome` varchar(24),
    `ist_id` varchar(24) NOT NULL UNIQUE,
    `access_token` varchar(24), -- fixme not null ? Unique ?

    PRIMARY KEY (`id_socio`)
);

create table if not exists `projeto` (
    `id_projeto` integer NOT NULL AUTO_INCREMENT,
    `nome` varchar(24), -- fixme not null?
    `descricao` varchar(24),
    `id_estado` integer,
    `id_localizacao` integer,

    PRIMARY KEY (`id_projeto`),
    FOREIGN KEY (`id_estado`) REFERENCES `estado`(`id_estado`),
    FOREIGN KEY (`id_localizacao`) REFERENCES `localizacao`(`id_localizacao`)
);

create table if not exists `estado` (
    `id_estado` integer NOT NULL AUTO_INCREMENT,
    `nome` varchar(24) NOT NULL,
    PRIMARY KEY (`id_estado`)
);

create table if not exists `localizacao` (
    `id_localizacao` integer NOT NULL AUTO_INCREMENT,
    `nome` varchar(24) NOT NULL,
    PRIMARY KEY (`id_localizacao`)
);

create table if not exists `material` (
    `id_material` integer NOT NULL AUTO_INCREMENT,
    `nome` varchar(24) NOT NULL,
    `id_estado` integer,
    `id_localizacao` integer,
    `tipo` ENUM ('item', 'ferramenta'),

    PRIMARY KEY (`id_material`),
    FOREIGN KEY (`id_estado`) REFERENCES `estado`(`id_estado`),
    FOREIGN KEY (`id_localizacao`) REFERENCES `localizacao`(`id_localizacao`)
);

create table if not exists `requesicao` (
    `id_requesicao` integer not NULL AUTO_INCREMENT,
    `id_socio` integer NOT NULL,
    `data_saida` datetime NOT NULL,
    `id_material` integer NOT NULL,
    `data_entrada` datetime,

    PRIMARY KEY (`id_requesicao`),
    FOREIGN KEY (`id_socio`) REFERENCES `membro`(`id_socio`),
    FOREIGN KEY (`id_material`) REFERENCES `material`(`id_material`)
);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
