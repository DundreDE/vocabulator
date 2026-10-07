export default function LearningCardsScreen({ NameDeck }: {NameDeck: string}) {

    return (
       <div> 
            <div className="flwx min-h-screen items-center">
                <h1>You're learning {NameDeck}</h1>
                <p>Here are your learning cards:</p>
            </div>
          
        </div>
    );
}    
