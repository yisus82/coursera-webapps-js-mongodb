// code that is shared between client and server, i.e. sent to both

// method definitions
Meteor.methods({
    // adding text to chat
    addText: function (chat, text) {
        // see if we can find a chat object in the database
        // to which we'll add the message
        if (chat) {// ok - we have a chat to use
            if (this.userId && ((chat.user1Id == this.userId) || (chat.user2Id == this.userId))) {
                var msgs = chat.messages; // pull the messages property
                if (!msgs) {// no messages yet, create a new array
                    msgs = [];
                }
                // is a good idea to insert data straight from the form
                // (i.e. the user) into the database?? certainly not. 
                // push adds the message to the end of the array
                msgs.push({ text: text, user: this.userId });
                // put the messages array onto the chat object
                chat.messages = msgs;
                // update the chat object in the database.
                Chats.update(chat._id, chat);
            }
        }
        return;
    },
    // Insert chat
    addChat: function (chat) {
        return Chats.insert(chat);
    }
});