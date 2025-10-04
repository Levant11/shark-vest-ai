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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      data_room_documents: {
        Row: {
          document_name: string
          document_type: string | null
          document_url: string
          id: string
          project_id: string
          uploaded_at: string
          uploaded_by: string
        }
        Insert: {
          document_name: string
          document_type?: string | null
          document_url: string
          id?: string
          project_id: string
          uploaded_at?: string
          uploaded_by: string
        }
        Update: {
          document_name?: string
          document_type?: string | null
          document_url?: string
          id?: string
          project_id?: string
          uploaded_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_room_documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_preferences: {
        Row: {
          id: string
          industries: string[] | null
          investor_id: string
          max_ticket_size: number | null
          min_ticket_size: number | null
          preferred_countries: string[] | null
          stages: string[] | null
          updated_at: string
        }
        Insert: {
          id?: string
          industries?: string[] | null
          investor_id: string
          max_ticket_size?: number | null
          min_ticket_size?: number | null
          preferred_countries?: string[] | null
          stages?: string[] | null
          updated_at?: string
        }
        Update: {
          id?: string
          industries?: string[] | null
          investor_id?: string
          max_ticket_size?: number | null
          min_ticket_size?: number | null
          preferred_countries?: string[] | null
          stages?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          created_at: string
          founder_id: string
          id: string
          investor_id: string
          match_score: number | null
          project_id: string
          status: string | null
        }
        Insert: {
          created_at?: string
          founder_id: string
          id?: string
          investor_id: string
          match_score?: number | null
          project_id: string
          status?: string | null
        }
        Update: {
          created_at?: string
          founder_id?: string
          id?: string
          investor_id?: string
          match_score?: number | null
          project_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          match_id: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          match_id?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          match_id?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          link: string | null
          message: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          profile_picture_url: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          profile_picture_url?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          profile_picture_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_scores: {
        Row: {
          generated_at: string
          id: string
          market_score: number | null
          overall_score: number | null
          product_score: number | null
          project_id: string
          risk_assessment: Json | null
          swor_analysis: Json | null
          team_score: number | null
          traction_score: number | null
        }
        Insert: {
          generated_at?: string
          id?: string
          market_score?: number | null
          overall_score?: number | null
          product_score?: number | null
          project_id: string
          risk_assessment?: Json | null
          swor_analysis?: Json | null
          team_score?: number | null
          traction_score?: number | null
        }
        Update: {
          generated_at?: string
          id?: string
          market_score?: number | null
          overall_score?: number | null
          product_score?: number | null
          project_id?: string
          risk_assessment?: Json | null
          swor_analysis?: Json | null
          team_score?: number | null
          traction_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_scores_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          financials_url: string | null
          founder_id: string
          funding_goal: number | null
          id: string
          industry: string | null
          pitch_deck_url: string | null
          project_concept: string | null
          project_name: string
          stage: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          financials_url?: string | null
          founder_id: string
          funding_goal?: number | null
          id?: string
          industry?: string | null
          pitch_deck_url?: string | null
          project_concept?: string | null
          project_name: string
          stage?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          financials_url?: string | null
          founder_id?: string
          funding_goal?: number | null
          id?: string
          industry?: string | null
          pitch_deck_url?: string | null
          project_concept?: string | null
          project_name?: string
          stage?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      trust_scores: {
        Row: {
          badge: string | null
          id: string
          platform_activity: number | null
          profile_completeness: number | null
          score: number
          updated_at: string
          user_id: string
          verification_level: number | null
        }
        Insert: {
          badge?: string | null
          id?: string
          platform_activity?: number | null
          profile_completeness?: number | null
          score?: number
          updated_at?: string
          user_id: string
          verification_level?: number | null
        }
        Update: {
          badge?: string | null
          id?: string
          platform_activity?: number | null
          profile_completeness?: number | null
          score?: number
          updated_at?: string
          user_id?: string
          verification_level?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_verifications: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          id: string
          task_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          id?: string
          task_id: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          id?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_verifications_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "verification_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_tasks: {
        Row: {
          id: string
          points: number
          task_description: string | null
          task_name: string
          task_order: number
        }
        Insert: {
          id?: string
          points?: number
          task_description?: string | null
          task_name: string
          task_order: number
        }
        Update: {
          id?: string
          points?: number
          task_description?: string | null
          task_name?: string
          task_order?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "founder" | "investor" | "admin"
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
    Enums: {
      app_role: ["founder", "investor", "admin"],
    },
  },
} as const
