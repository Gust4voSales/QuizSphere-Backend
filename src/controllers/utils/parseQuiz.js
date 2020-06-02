function parseQuiz(userId, quiz) {
    quiz.likeCounter = quiz.likes.length;

    quiz.liked = false;
    for (let likeId of quiz.likes) {
        if (likeId==userId){
            quiz.liked = true;
            break;
        } 
    }

    quiz.id = undefined;
    quiz.likes = undefined;
}

module.exports = parseQuiz;