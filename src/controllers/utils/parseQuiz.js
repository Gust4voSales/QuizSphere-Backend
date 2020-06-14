// Function that returns the quiz with the information about if the user liked it or not 
function parseQuiz(userId, quiz) {
    quiz.liked = false;
    for (let likeId of quiz.likes) {
        if (likeId==userId){
            quiz.liked = true;
            break;
        } 
    }

    quiz.id = undefined;
    // quiz.likes = undefined;
}

module.exports = parseQuiz;