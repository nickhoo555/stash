package sqlite

type UserStore struct {
    db *Database
}

func NewUserStore(db *Database) *UserStore {
    return &UserStore{db: db}
}

// 实现 UserReader 和 UserWriter 接口的方法 