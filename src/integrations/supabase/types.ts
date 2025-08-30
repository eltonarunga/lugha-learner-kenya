export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          is_active: boolean
          name: string
          requirement_type: string
          requirement_value: number
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          is_active?: boolean
          name: string
          requirement_type: string
          requirement_value: number
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          is_active?: boolean
          name?: string
          requirement_type?: string
          requirement_value?: number
        }
        Relationships: []
      }
      languages: {
        Row: {
          code: string
          created_at: string
          flag_emoji: string | null
          id: string
          name: string
          native_name: string
        }
        Insert: {
          code: string
          created_at?: string
          flag_emoji?: string | null
          id?: string
          name: string
          native_name: string
        }
        Update: {
          code?: string
          created_at?: string
          flag_emoji?: string | null
          id?: string
          name?: string
          native_name?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          created_at: string
          cultural_context: string | null
          description: string | null
          id: string
          is_active: boolean
          language_code: string
          lesson_type: string | null
          level: number
          order_index: number
          title: string
          updated_at: string
          xp_reward: number
        }
        Insert: {
          created_at?: string
          cultural_context?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          language_code: string
          lesson_type?: string | null
          level?: number
          order_index: number
          title: string
          updated_at?: string
          xp_reward?: number
        }
        Update: {
          created_at?: string
          cultural_context?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          language_code?: string
          lesson_type?: string | null
          level?: number
          order_index?: number
          title?: string
          updated_at?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "lessons_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      profiles: {
        Row: {
          age: string | null
          created_at: string
          current_streak: number
          email: string | null
          id: string
          last_activity_date: string | null
          longest_streak: number
          name: string
          native_language: string | null
          selected_language: string
          total_xp: number
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: string | null
          created_at?: string
          current_streak?: number
          email?: string | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number
          name: string
          native_language?: string | null
          selected_language?: string
          total_xp?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: string | null
          created_at?: string
          current_streak?: number
          email?: string | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number
          name?: string
          native_language?: string | null
          selected_language?: string
          total_xp?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          audio_url: string | null
          correct_answer: number
          created_at: string
          cultural_meaning: string | null
          explanation: string | null
          id: string
          image_url: string | null
          language_origin: string | null
          lesson_id: string
          options: string[]
          order_index: number
          proverb_text: string | null
          question_text: string
        }
        Insert: {
          audio_url?: string | null
          correct_answer: number
          created_at?: string
          cultural_meaning?: string | null
          explanation?: string | null
          id?: string
          image_url?: string | null
          language_origin?: string | null
          lesson_id: string
          options: string[]
          order_index: number
          proverb_text?: string | null
          question_text: string
        }
        Update: {
          audio_url?: string | null
          correct_answer?: number
          created_at?: string
          cultural_meaning?: string | null
          explanation?: string | null
          id?: string
          image_url?: string | null
          language_origin?: string | null
          lesson_id?: string
          options?: string[]
          order_index?: number
          proverb_text?: string | null
          question_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          attempts: number
          completed_at: string | null
          created_at: string
          id: string
          is_completed: boolean
          language_code: string
          lesson_id: string
          score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts?: number
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean
          language_code: string
          lesson_id: string
          score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts?: number
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean
          language_code?: string
          lesson_id?: string
          score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_answer: {
        Args: { p_question_id: string; p_selected_answer: number }
        Returns: {
          correct_answer: number
          explanation: string
          is_correct: boolean
          xp_earned: number
        }[]
      }
      complete_lesson: {
        Args: { p_language_code: string; p_lesson_id: string; p_score: number }
        Returns: {
          lesson_xp: number
          success: boolean
          total_xp_earned: number
        }[]
      }
      get_public_leaderboard: {
        Args: { p_limit?: number }
        Returns: {
          current_streak: number
          name: string
          rank: number
          total_xp: number
        }[]
      }
      get_public_questions: {
        Args: { lesson_id: string }
        Returns: {
          audio_url: string
          cultural_meaning: string
          id: string
          image_url: string
          language_origin: string
          lesson_id: string
          options: string[]
          order_index: number
          proverb_text: string
          question_text: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
