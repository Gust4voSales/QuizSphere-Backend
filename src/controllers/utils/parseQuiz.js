// Function that returns the quiz with the information about if the user liked it or not and also with
// the number of likes
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