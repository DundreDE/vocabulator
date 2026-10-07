// import { getcards} from "";

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

    

export default function LearningCardspage() {
    return (
        <main>
            <div className="flex min-h-screen items-center justify-center p-6">
                <div className="flex min-h-screen justify-center p-6">
                    <h1 className="text-2xl font-bold">Learn your deck</h1>
                </div>
                <div className="">
                    
                </div>
            </div>
        </main>
    );
}
    
