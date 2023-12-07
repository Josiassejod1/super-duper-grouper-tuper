import db from "../db";

class PouchRepository {
  subscribeToChanges(changeHandler) {
    const changes = db.changes({
      since: "now",
      live: true,
      include_docs: true,
    });

    changes.on("change", changeHandler);

    return changes;
  }
}

export default PouchRepository;
