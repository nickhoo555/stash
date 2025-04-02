package models

type User struct {
    ID           int    `json:"id"`
    Username     string `json:"username"`
    PasswordHash string `json:"-"`
    IsAdmin      bool   `json:"is_admin"`
    CreatedAt    string `json:"created_at"`
    UpdatedAt    string `json:"updated_at"` 
}

type UserReader interface {
    Find(ctx context.Context, id int) (*User, error)
    FindByUsername(ctx context.Context, username string) (*User, error)
}

type UserWriter interface {
    Create(ctx context.Context, newUser *User) error
    Update(ctx context.Context, updatedUser *User) error
    Delete(ctx context.Context, id int) error
}

type UserReaderWriter interface {
    UserReader
    UserWriter
} 