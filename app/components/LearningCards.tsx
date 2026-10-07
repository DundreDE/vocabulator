import { getcards} from "";

interface card { 

    front: string;
    back: string;
    learned: boolean;

}

interface deck {

    name: string;
    cards: card[];
    completed: boolean; 

}

    
