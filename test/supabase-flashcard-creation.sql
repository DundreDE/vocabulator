select id, email from auth.users

with new_deck as (
    insert into public.decks (name, user_id)
    values ('My test deck', 'USER_ID')
    returning id
)

insert into public.cards(deck_id, front, back)
select new_deck.id, c.front, c.back 
from new_deck, (values
    ('Hallo', 'Hello'),
    ('Tschüss', 'Goodbye'),
    ('Danke', 'Thank you'),
    ('Bitte', 'Please'),
    ('Ja', 'Yes'),
    ('Nein', 'No')
) as c(front, back);