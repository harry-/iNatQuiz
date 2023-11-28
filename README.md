# INatQuiz

A very simple quiz application using observation fotos from iNaturalist.org

## Built with

Angular, supabase, iNaturalist API

## Prerequisites

A database on supabase.com needs to be set up with the following table:

```
create table
  public."iNatQuizUser" (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    "user" character varying null,
    score bigint null default '0'::bigint,
    questionindex bigint null default '0'::bigint,
    constraint iNatQuizUser_pkey primary key (id)
  ) tablespace pg_default;
```

  And the following funtions:

```
  create function incrementscore (incrementby int, userid int) 
returns void as
$$
  update "iNatQuizUser" 
  set score = score + incrementby
  where id = userid
$$ 
language sql volatile;
```

```
create function incrementindex (incrementby int, userid int) 
returns void as
$$
  update "iNatQuizUser" 
  set questionindex = questionindex + incrementby
  where id = userid
$$ 
language sql volatile;
```
Add the url and api key of the database to database.service.ts

##acknowledgments

Thanks to jmevangelist for the interface definitions of the json data. I would have had a hard time figuring this out on my own. Check out her nature gram project here: https://github.com/jmevangelist/nature-gram

